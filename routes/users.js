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




module.exports = router;