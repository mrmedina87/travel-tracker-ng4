var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./config/database');
var User = require('./app/models/user');
var Travel = require('./app/models/travel');

var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');

app.get('/', function(request,response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

app.use(passport.initialize());

app.use(express.static('public'));

var apiRoutes = express.Router();
var apiUserRoutes = express.Router();
var apiTravelRoutes = express.Router();

app.use('/api', apiRoutes);
app.use('/api/users', apiUserRoutes);
app.use('/api/travels', apiTravelRoutes);

var mongoAccessFailed = function(err, respObj) {
  respObj.status(500).json({msg: 'DB - Connection error'});
  throw err;
};

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

apiRoutes.post('/login', function(request, response) {
  User.findOne(
    {
      name: request.body.userName
    },
    function(err, user) {
      var authFailedMessage = {
        msg:'Authentication failed - wrong credentials'
      };
      if(err) {
        mongoAccessFailed(err, response);
      }
      if(!user) {
        response.status(400).json(authFailedMessage);
      }
      else {
        user.comparePassword(request.body.password, function(err, matchs) {          
          if(matchs && !err) {
            var token = jwt.encode(user, config.secret);
            response.status(200).json({ 
              successMsg: 'Successfully connected',
              token: 'JWT ' + token,
              admin: user.admin
            });
          }
          else {
            response.status(401).json(authFailedMessage);
          }
        });
      }
    }
  );
});
apiRoutes.get('/login', function(request, response) {
  User.count({}, function(errCount, count){
    if(errCount) {
      response.status(401).json({status: 'Something wrong while trying to count'});
    }
    else {
      if(count === 0) {
        response.status(201).json({empty: true});
      }
      else {
        response.status(201).json({empty: false});
      }
    }   
  });
});

apiRoutes.post('/signup', function(request, response) {
  User.findOne(
    {
      name: request.body.userName
    },
    function(err, user) {
      var exists = {
        msg:'Authentication failed - wrong credentials'
      };
      if(err) {
        mongoAccessFailed(err, response);
      }
      if(!user) {
        var userToInsert = request.body;
        if((typeof userToInsert.name === 'string') && (typeof userToInsert.password === 'string') ) {
          User.count({}, function(errCount, count){
            if(errCount) {
              response.status(401).json({status: 'Something wrong while trying to count'});
            }
            else {
              if(count === 0) {
                userToInsert.admin = true;
              }
              else {
                userToInsert.admin = false;
              }
              var newUser = new User(userToInsert);
              newUser.save(function(err) {
                if(err) {
                  console.log("err.code:", err.code);
                  if(err.code === 11000){
                    response.status(409).json({status: 'This user already exists'});
                  }
                  else {
                    response.status(401).json({status: 'Something went wrong while trying to create'});
                  }
                }
                else {
                  response.status(201).json({status: 'Successfully created new User'});
                }
              }); 
            }
                     
          });
        }
      }
      else {
        response.status(401).json(exists);
      }
    }
  );
});

// users CRUD

apiUserRoutes.get(
  '/:but',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var authFailedMessage = {
      msg:'Not enough user permissions - You have to be logged in as admin so as to access to users data'
    };
    var currentUser = request.params.but;
    
    if(!currentUser) {
      response.status(426).json(authFailedMessage);
    }
    else {
      var resp = {usersList: []};
      User.find(
        {
          name: {
            '$ne': currentUser
          }
        },
        function(err, users){
          if(err) {
            mongoAccessFailed(err, response);
          }
          resp.usersList = users;
          response.status(200).json(resp);
        }
      );
    }
  }
);
apiUserRoutes.delete(
  '/:target',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var _this = this;
    _this.deleteTravelsStatus = false;
    _this.deleteUserStatus = false;

    Travel.remove(
      {user: request.params.target},
      function(err, operationData) {
        if(err)
          mongoAccessFailed(err, response);
        if(operationData.result.ok && operationData.result.n) {
          _this.deleteTravelsStatus = "User's travels were deleted";
        }
        else {
          _this.deleteTravelsStatus = "This user didn't have travels";
        }
        User.remove(
          {name: request.params.target},
          function(err, operationData) {
            if(err)
              mongoAccessFailed(err, response);
            if(operationData.result.ok && operationData.result.n) {
              _this.deleteUserStatus = 'User deleted';
            }
            else {
              _this.deleteUserStatus = false;
            }
            //check-results
            if(_this.deleteTravelsStatus && _this.deleteUserStatus) {
              response.status(200).json({status: _this.deleteTravelsStatus + ' - ' + _this.deleteUserStatus});
            }
            else {
              if(!_this.deleteUserStatus) {
                response.status(404).json({status: 'We could not find that user'});
              }
              else {
                response.status(404).json({status: 'Something happened while trying to delete travels'});
              }
            }
          }
        );
      }
    ); 
  }
);
apiUserRoutes.post(
  '',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var userToInsert = request.body;
    if(typeof userToInsert.admin !== 'boolean') {
      userToInsert.admin = (userToInsert.admin === 'true');
    }
    if((typeof userToInsert.name === 'string') && (typeof userToInsert.password === 'string') && (typeof userToInsert.admin === 'boolean') ) {
      var newUser = new User(userToInsert);
      newUser.save(function(err) {
        if(err) {
          if(err.toJSON().code === 11000){
            response.status(409).json({status: 'This user already exists'});  
          }
          else {
            mongoAccessFailed(err, response);
          }
        }
        else {
          response.status(201).json({status: 'Successfully created new User'});
        }
      });
    }
    else{
      response.status(400).json({status: 'Not enough parameters'});
    }
  }
);
apiUserRoutes.put(
  '',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var userToUpdate = request.body;
    if(typeof userToUpdate.admin !== 'boolean') {
      userToUpdate.admin = (userToUpdate.admin === 'true');
    }
    if((typeof userToUpdate.name === 'string') && (typeof userToUpdate.password === 'string') && (typeof userToUpdate.admin === 'boolean') ) {
      User.update(
        {
          name: userToUpdate.name
        },
        {
          $set: {
            password: userToUpdate.password,
            admin: userToUpdate.admin
          }
        },
        function(err) {
          if(err) {
            mongoAccessFailed(err, response);
          }
          response.status(201).json({status: 'Successfully updated'});
        }
      );
    }
    else{
      response.status(400).json({status: 'Not enough parameters'});
    }
  }
);

// travels CRUD

apiTravelRoutes.get(
  '/:start/:end',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var currentUser = jwt.decode(getToken(request.headers), config.secret).name;
    var query = {};
    if(request.params.start === "nextmonth") {
      var month = parseInt(request.params.end);
      var lastDay;
      var firstDay = new Date((new Date).getFullYear(),month,1);
      if(month === 1) {
        lastDay = new Date((new Date).getFullYear(),month,28)
      }
      else if( (new Date((new Date).getFullYear(),month,31)).getDate() === 1 ) {
        lastDay = new Date((new Date).getFullYear(),month,30);
      }
      else {
        lastDay = new Date((new Date).getFullYear(),month,30);
      }
      query = {
        user: currentUser,
        "$or": [
          {
            end: {
              "$gte": firstDay,
              "$lte": lastDay
            }
          },
          {
            start: {
              "$gte": firstDay,
              "$lte": lastDay
            }
          }
        ]
      };
    }
    else if(request.params.end !== "theend") {
      var starting = new Date(parseInt(request.params.start));
      var finishing = new Date(parseInt(request.params.end));
      query = {
        user: currentUser,
        start: {
          "$gte": starting
        },
        end: {
          "$lte": finishing
        }
      };
    }
    else {
      var starting = new Date(parseInt(request.params.start));
      query = {
        user: currentUser,
        start: {
          "$gte": starting
        }
      };
    }
    
    var resp = {travelsList: []};
    Travel.find(query, function(err, travels) {
        if(err)
          mongoAccessFailed(err, response);
        resp.travelsList = travels;
        response.status(200).json(resp);
      }
    );
  }
);
apiTravelRoutes.get(
  '',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var currentUser = jwt.decode(getToken(request.headers), config.secret).name;
    var resp = {travelsList: []};
    Travel.find(
      {
        user: currentUser
      },
      function(err, travels) {
        if(err)
          mongoAccessFailed(err, response);
        resp.travelsList = travels;
        response.status(200).json(resp);
      }
    );
  }
);
apiTravelRoutes.post(
  '',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var travelToInsert = request.body;
    var currentUser = jwt.decode(getToken(request.headers), config.secret).name;
    if((typeof travelToInsert.destination === 'string') && 
       (typeof travelToInsert.comment === 'string') && 
       travelToInsert.start && travelToInsert.end ) { 
      travelToInsert.user = currentUser;
      var newTravel = new Travel(travelToInsert);
      newTravel.save(function(err) {
        if(err) {
          mongoAccessFailed(err, response);
        }
        else {
          response.status(201).json({status: 'Successfully created new Travel'});
        }
      });
    }
    else{
      response.status(400).json({status: 'Not enough parameters'});
    }
  }
);
apiTravelRoutes.delete(
  '/:target',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var travelToInsert = request.body;
    var currentUser = jwt.decode(getToken(request.headers), config.secret).name;
    Travel.remove(
      {
        user: currentUser,
        _id: request.params.target
      },
      function(err, operationData) {
        if(err)
          mongoAccessFailed(err, response);
        if(operationData.result.ok && operationData.result.n) {
          response.status(200).json({status: 'Successfully deleted'});
        }
        else {
          response.status(404).json({status: 'That travel does not belong to that user'});
        }
      }
    );
  }
);
apiTravelRoutes.put(
  '',
  passport.authenticate('jwt', {session: false} ),
  function(request, response) {
    var travelToUpdate = request.body;
    if((typeof travelToUpdate.destination === 'string') && 
       (typeof travelToUpdate.comment === 'string') && 
       travelToUpdate.start && travelToUpdate.end && travelToUpdate._id) {
      Travel.update(
        {
          _id: travelToUpdate._id
        },
        {
          start: travelToUpdate.start,
          end: travelToUpdate.end,
          destination: travelToUpdate.destination,
          comment: travelToUpdate.comment
        },
        function(err) {
          if(err) {
            mongoAccessFailed(err, response);
          }
          response.status(201).json({status: 'Successfully updated'});
        }
      );
    }
    else{
      response.status(400).json({status: 'Not enough parameters'});
    }
  }
);

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

mongoose.connect(config.database);
require('./config/passport')(passport);

app.listen(port, function() {
  console.log('Try accessing to localhost:' + port);
});
