const mongoose = require('mongoose');
const { isEmail, isAlphanumeric } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        minLength: [8, 'Minimum name length is 8 characters'],
        // validate: [!isAlphanumeric, 'Name cannot contain numeric characters']
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
        minLength: [8, 'Minimum password length is 8 characters']
    }
}, { timestamps: true });

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    // user'a erişmek için this anahtar kelimesi kullanılır
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
        // kıyaslamadan true ya da false gelecek
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