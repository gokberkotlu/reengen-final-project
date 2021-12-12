const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'factory dashboard secret', {
        expiresIn: maxAge // in seconds
    });
}

const signup_post = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.status(201).json({ token });
    } catch(err) {
        res.status(400).json({ errors: err });
    }
}

module.exports = {
    signup_post
}