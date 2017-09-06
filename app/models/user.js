var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
});

var saveEncryptedPass = function(userObj, next) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(userObj.password , salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      userObj.password = hash;
      next();
    });
  });
}

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    saveEncryptedPass(user, next);
  } 
  else {
    return next();
  }
});

UserSchema.pre('update', function (next) {
  var user = this;
  saveEncryptedPass(user._update.$set, next);
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);