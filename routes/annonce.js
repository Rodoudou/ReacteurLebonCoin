const express = require("express");
const router = express.Router();

//importation des models
const User = require('../models/userModel');
const Annonce = require('../models/annonceModel');

//Importation du middleware !
const isAuthenticated = require("../middleware/isAuthenticated");



//route  offer/publish
router.post("/offer/publish", isAuthenticated, async (req, res) =>{




});




module.exports = router;