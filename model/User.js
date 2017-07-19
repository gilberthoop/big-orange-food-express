var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userService = require("../services/user-service");

var userSchema = new Schema({
    firstName: {type: String, required: 'Please enter your first name.'},
    lastName: {type: String, required: 'Please enter your last name.'},
    address: {type: String, required: 'Please enter your full address'},
    email: {type: String, required: 'Please enter your email.'},
    password: {type: String, required: 'Please enter your password.'},
    created: {type: Date, default: Date.now}
})

userSchema.path('email').validate(function(value, next) {
    userService.findUser(value, function(err, user) {
        if(err) {
            console.log(err);
            return next(false);
        }
        next(!user);
    });
}, "That email has been in use.")

var User = mongoose.model('User', userSchema);
 
module.exports = {
    User: User
};