const User = require('../models/users-model');



const getAllUsers = async (req, res, next) => {
    
    let users;
    try {
        users = await User.find({}, '-password');  //elemnate the password from the returing objects
    } catch(err) {
        return next(err);
    };

    if(!users || users.length === 0) {
        const error = new Error("there is no users");
        error.code = 404;
        return next(error);
    }

    res.status(200).json({users});
};

const signup = async (req, res, next) => {
    const { name, email, password, image } = req.body;

    let hasUser;
    try {
        hasUser = await User.findOne({ email: email});
    } catch(err) {
        return next(err);
    }

    if(hasUser) {
        const error = new Error("User exists already, please login instaed");
        error.code = 422;
        return next(error);
    };
    
    const newUser = new User({
        name,
        email,
        password,
        image,
        places: []
    });

    try {
        await newUser.save();
    } catch(err) {
        return next(err);
    }

    res.status(201).json({user: newUser.toObject()});
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let hasUser;
    try {
        hasUser = await User.findOne({ email: email}, 'password');
    } catch(err) {
        return next(err);
    }

    if(!hasUser || password !== hasUser.password) {
        const error = new Error("invalid credintials, please try again");
        error.code = 401;
        return next(error);
    }


    res.status(200).json({message: "logged in"});
};


exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;