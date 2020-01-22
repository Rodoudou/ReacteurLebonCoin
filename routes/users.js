const express = require("express");
const router = express.Router();

//importation model
const User = require('../models/userModel');

const uid2 = require("uid2");
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');


// Enregister un nouvel User dans la BDD et creation d'un password
router.post("/user/sign_up", async (req, res) => {

    //Data pour construction du password
    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(req.fields.password + salt).toString(encBase64);
    const body = req.fields;
    console.log('body 1ere route user/sign_up => ', body);

    try {

        if (!body.username) {

            res.json({
                error: "Username non renseigné!"
            });

        }


        const myUser = await User.findOne({
            email: body.email
        })

        //chercher si le mail est existant
        if (myUser) {
            res.json({
                error: "Mail deja existant!"
            });



        } else {

            const newUser = new User({

                email: body.email,
                token,
                salt,
                hash,
                account: {
                    username: body.username,
                    phone: body.phone
                }

            });

            console.log('data newUser avant le save() =>', newUser)
            // console.log('######',newUser._id,)
            await newUser.save();
            return res.json({
                _id: newUser._id,
                token: newUser.token,
                account: newUser.account
            });

        }

    } catch (error) {
        return res.status(400).json({
            message: "An error occurred"
        });
    }

})


//route  login
/*
router.post("/user/log_in", async (req, res) => {
    // Pour afficher les données reçues :
    const body = req.fields;
    console.log(body);
    try {
  // on cherche le user qui veut se connecter
  const user = await User.findOne({ email: req.fields.email });

  if (user) {
    // si le hash du mot de passe qu'il vient de saisir est le même que le hash enregistré en BDD lors de son inscription, alors c'est bon !
    if (
      SHA256(req.fields.password + user.salt).toString(encBase64) ===
      user.hash
    ) {
        return res.json({
            _id: body._id,
            token: body.token,
            account: {
                username: body.username,
                phone: body.username
            }
        })

     } else {
        // sinon, il n'est pas autorisé à se connecter
        res.json({ error: "Unauthorized" });
      }
    } else {
      res.json({ error: "User not found" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

*/

module.exports = router;