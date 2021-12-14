const User = require('../models/User');
const jwt = require('jsonwebtoken');

const jwt_secret = 'factory dashboard secret';

const maxAge = 3 * 24 * 60 * 60; // in seconds

const createToken = (id) => {
    return jwt.sign({ id }, jwt_secret, {
        expiresIn: maxAge // in seconds
    });
}

const checkToken_get = async (req, res) => {
    const token = req.body.token;
    console.log(token);
    if(token) {
        jwt.verify(token, jwt_secret, async (err, decodedToken) => {
            if(err) {
                res.status(400).json({
                    error: "Token is not verified"
                });
            } else {
                let user = await User.findById(decodedToken.id);
                res.status(200).json({
                    authority: user.authority,
                    name: user.name,
                    email: user.email
                });
            }
        })
    } else {
        res.status(201).json({
            info: "Token not send"
        });
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({
                token,
                expiresIn: maxAge * 1000, // in milliseconds
                authority: user.authority,
                name: user.name,
                email: user.email
            });
    } catch(err) {
        res.status(400).json({
            error: "Wrong email or password"
        });
    }
}

const signup_post = async (req, res) => {

    const { name, email, password, authority } = req.body;

    try {
        const user = await User.create({ name, email, password, authority });
        const token = createToken(user._id);
        // res.status(200).json({ token });
        res.status(200).json({
            token,
            expiresIn: maxAge * 1000, // in milliseconds
            authority: user.authority,
            name: user.name,
            email: user.email
        });
    } catch(err) {
        console.log(err);
        // 11000 unique error
        let errorResponse = {
            error: ""
        }

        if(err?.code === 11000) {
            errorResponse.error = 'That email is already registered';
        } else {
            errorResponse.error = 'Something went wrong while registration';
        }

        res.status(400).json(errorResponse);
    }
}

module.exports = {
    checkToken_get,
    login_post,
    signup_post
}