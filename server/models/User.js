const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        minLength: [8, 'Minimum name length is 8 characters'],
        validate(value) {
            // only letter and white space(includes tr letters)
            let regex = /^[a-zA-ZiİçÇşŞğĞÜüÖö\s]*$/;
            if(!regex.test(value)) {
                throw new Error('Name cannot contain numeric and special characters');
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Minimum password length is 8 characters'],
        validate(value) {
            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if(!regex.test(value)) {
                throw new Error('Password must have at least one uppercase letter, one lowercase letter and one number');
            }
        }
    },
    authority: {
        type: String,
        required: [true, 'Choose an authority'],
        validate(value) {
            let authorities = ["admin", "editor"];
            if(!authorities.includes(value)) {
                throw new Error('Authority can only be admin or editor');
            }
        }
    }
}, { timestamps: true });

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
    // this will referre user model
    const user = await this.findOne({
        email: email
    });

    if(user) {
        // compare will return true or false
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema);

module.exports = User;