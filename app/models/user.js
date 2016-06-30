var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: String,
  admin: Boolean
});
userSchema.methods.setPassword = function(password){
  this.password = crypto.pbkdf2Sync(password, 'isalt', 1000, 64).toString('hex');
};
userSchema.methods.checkPassword = function(password) {
  var pass = crypto.pbkdf2Sync(password, 'isalt', 1000, 64).toString('hex');
  if(this.password === pass) {
    return true;
  }
};

module.exports = mongoose.model('User', userSchema);