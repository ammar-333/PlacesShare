
const mongoose = require('mongoose');
const Place = require("../models/places-model");
const User = require('../models/users-model')
const getCoordsForAddress = require("../util/location");



const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId); 
    } catch(err) {
        return next(err);
    }

    if(!place) {
        const error = new Error('Could not find a place with this id');
        error.code = 404;
        return next(error);
    }

    res.json({place: place.toObject()}); // place.toObject() convert place from an mongoose function into a js function
};


const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    
    let places
    try {
        places = await Place.find({ creator: userId});
    } catch(err) {
        return next(err);
    }

    if(!places || places.length === 0) {
        const error = new Error('Could not find a place with this user id');
        error.code = 404;
        return next(error);
    }

    res.json({places});
};

const createPlace = async (req, res, next) => {
    const { title, description , address, creator } = req.body;

    let coordinates;
    try {
        coordinates = getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "image",
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch(err) {
        return next(err);
    }

    if(!user) {
        const error = new Error("there is no user with the provided id");
        error.code = 404;
        return next(error);
    }

    try {
           // only work with atlas not with local database like compass
        // const sess = await mongoose.startSession();
        // sess.startTransaction();
        // await createdPlace.save({ session: sess });
        // user.places.push(createdPlace);      
        // await user.save({ session: sess });
        // await sess.commitTransaction();

        await createdPlace.save();
        user.places.push(createdPlace);      // establish a connection between user and place models && add only the createdplace (ID) to the user model
        await user.save();

    } catch(err) {
        return next(err);
    };

    res.status(201).json({place: createdPlace});
};

const updatePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    const { title, description} = req.body;

    let updatePlace;
    try {
        updatePlace = await Place.findById(placeId);
    } catch (err) {
        return next(err);
    }

    if(!updatePlace) {
        const error = new Error("Could find an place with this id");
        error.code = 404;
        return next(error);
    }

    updatePlace.title = title;
    updatePlace.description = description;

    try {
        await updatePlace.save();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({place: updatePlace.toObject()});
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let deletedPlace;
    try {
         deletedPlace = await Place.findById(placeId).populate('creator');
    } catch (err) {
        return next(err);
    }

    if(!deletedPlace) {
        const error = new Error("Could find an place with this id");
        error.code = 404;
        return next(error);
    }

    try {
        await deletedPlace.deleteOne();
        deletedPlace.creator.places.pull(deletedPlace);
        await deletedPlace.creator.save();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({meassage: "Deleted"})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;