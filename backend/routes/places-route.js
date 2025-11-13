const express = require("express");
const router = express.Router(); 

const PlacesController = require("../controllers/places-controller");


// api/places/:pid
router.get("/:pid", PlacesController.getPlaceById);

// api/places/users/:uid
router.get('/users/:uid', PlacesController.getPlacesByUserId);

// api/places
router.post('/', PlacesController.createPlace);

// api/places/:pid
router.patch('/:pid', PlacesController.updatePlace);

// api/places/:pid
router.delete('/:pid', PlacesController.deletePlace);

module.exports = router;