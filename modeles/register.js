const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({

    InputEmail: {
        type: String,
        required: true,
        unique: true
    },
    InputPassword1: {
        type: String,
        required: true,
        minLength: 8
    },
    InputPassword2: {
        type: String,
        required: true,
        minLength: 8
    },

});

userSchema.pre('save', function (next) {
    if (this.InputPassword1 && this.isModified('password')) {
        bcrypt.hash(this.InputPassword1, 10, (err, hashed) => {
            if (err) return next(err);
            this.InputPassword1 = hashed;
            this.InputPassword2 = undefined;
            next();
        });
    } else {

        next();
    }
});

userSchema.methods.checkPassword=function(InputPassword1, cb){
    bcrypt.compare(InputPassword1, this.InputPassword1, (err, result) => {
        return cb(err, result);
    });
};

//Create collection
const Signup = new mongoose.model("Signup", userSchema);

module.exports = Signup;