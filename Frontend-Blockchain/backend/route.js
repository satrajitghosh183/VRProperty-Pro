const express = require("express");
const router = express.Router();
const {searchPlaces} = require('./search');


router.route('/:search').get(searchPlaces);


module.exports = router;