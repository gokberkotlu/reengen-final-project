const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');

const jwt_secret = 'factory dashboard secret';

const editPassword_patch = async (req, res) => {
    const { currentPassword, newPassword, token } = req.body;

    if(token) {
        jwt.verify(token, jwt_secret, async (err, decodedToken) => {
            if(err) {
                res.status(400).json({
                    error: "Token is not verified"
                });
            } else {
                var user = await User.findById(decodedToken.id);
                const auth = await compare(currentPassword, user.password);
                // if current password matches before setting new one
                if(auth) {
                    try {
                        user.password = newPassword;
                        await user.save();
                        res.status(200).json({
                            info: "Password changed"
                        });
                    } catch(err) {
                        res.status(400).json({
                            error: err?.errors?.password?.message
                        });
                    }
                } else {
                    res.status(400).json({
                        error: "Password is not valid"
                    });
                }
            }
        })
    } else {
        res.status(201).json({
            info: "Token not send"
        });
    }
}

const editAccount_patch = async (req, res) => {
    const { name, email, authority, password, token } = req.body;

    if(token) {
        jwt.verify(token, jwt_secret, async (err, decodedToken) => {
            if(err) {
                res.status(400).json({
                    error: "Token is not verified"
                });
            } else {
                var user = await User.findById(decodedToken.id);
                const auth = await compare(password, user.password);
                // if password is true
                if(auth) {
                    try {
                        user.name = name;
                        user.email = email;
                        user.authority = authority;
                        // set password again to not to get validation error because of sending hashed password to User model
                        user.password = password;
                        await user.save();
                        res.status(200).json({
                            info: "Account settings changed"
                        });
                    } catch(err) {
                        res.status(400).json({
                            error: err
                        });
                    }
                } else {
                    res.status(400).json({
                        error: "Could not change the account settings"
                    });
                }
            }
        })
    } else {
        res.status(201).json({
            info: "Token not send"
        });
    }
}

module.exports = {
    editPassword_patch,
    editAccount_patch
}