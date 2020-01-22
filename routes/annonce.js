const express = require("express");
const router = express.Router();

//importation des models
const User = require('../models/userModel');
const Annonce = require('../models/annonceModel');

//Importation du middleware !
const isAuthenticated = require("../middleware/isAuthenticated");



//route  offer/publish
router.post("/offer/publish", isAuthenticated, async (req, res) => {
    const body = req.fields;

 try {
     const newAnnonce = new Annonce({
         title: body.title,
         description: body.description,
         price: body.price,
         created: Date.now(),
         creator:req.user
        });
//###############################################################

        // faire en sorte que le titre, la description et le prix soit limités à :
        // description : 500 caractères
        // title : 50 caractères
        //  price : 100 000
        console.log('body.title.length',body.title.length)
if(body.title.length > 50 || body.description.length >500){
 return   res.json({error: 'vous avez depasser le nbr de caracteres'})
} else if(body.price >100000){
  return  res.json({error: 'Prix max est de 100 000'})
}else{
//###############################################################
    
    await newAnnonce.save();
console.log(newAnnonce)
    // on cherche tous les Annonces qui ont pour mail le mail reçu

    res.json({
        _id:newAnnonce._id,
        title: body.title,
        description: body.description,
        price: body.price,
        created: Date.now(),
        creator: {
            account: {
              username: req.user.account.username,
              phone: req.user.account.phone
            },
            _id: req.user._id
          }
    });
}

        // Ici renvoyer une reponse de la data de l'Annonce avec la reference de l'user


    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

});




module.exports = router;