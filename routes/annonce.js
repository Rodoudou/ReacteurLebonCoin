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
        const obj = {
            title: body.title,
            description: body.description,
            price: body.price,
            creator: req.user
        };

        const newAnnonce = new Annonce({obj});
        await newAnnonce.save();
        /*      console.log(newAnnonce) */
        // on cherche tous les Annonces qui ont pour mail le mail reçu

        res.json({
            _id: newAnnonce._id,
            title: newAnnonce.title,
            description: newAnnonce.description,
            price: newAnnonce.price,
            created:newAnnonce.created,
            creator: {
                account: newAnnonce.account.username,
                _id: newAnnonce._id
            }
        });

} catch (error) {
    res.json(400).json({
        error: error.message
    });
}

});

// fonction qui va construire un objet de filtres, que l'on enverra ensuite dans le find()
const createFilters = req => {
    const filters = {};
    if (req.query.priceMin) {
        filters.price = {};
        filters.price.$gte = req.query.priceMin;
    }
    if (req.query.priceMax) {
        if (filters.price === undefined) {
            filters.price = {};
        }
        filters.price.$lte = req.query.priceMax;
    }

    if (req.query.title) {
        filters.title = new RegExp(req.query.title, "i");
    }
    return filters;

};

// offer/with-count
router.get("/offer/with-count", async (req, res) => {
    try {

        const filters = createFilters(req);

        // Ici, nous construisons notre recherche
        const search = Annonce.find(filters).populate("creator");

        if (req.query.sort === "price-desc") {
            // Ici, nous continuons de construire notre recherche
            search.sort({
                price: 1
            });
        } else if (req.query.sort === "price-desc") {
            // Ici, nous continuons de construire notre recherche
            search.sort({
                price: -1
            });
        }
        // limit : le nombre de résultats affichés
        // skip : Ignorer les X premiers
        if (req.query.page) {
            const page = req.query.page;
            const limit = 4;

            search.limit(limit * (page - 1));
        }
        // la recherche est déclenchée grâce au await
        const products = await search;
        res.json({
            products
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

});

// offer/:id => Service web qui permettra de récupérer 
//les détails concernant une annonce, en fonction de son id.
router.get("/offer/:id", async (req, res) => {
    const id = req.params.id;
    console.log('#####=>', req.params)
    try {
        const dataAnnonce = await Annonce.findById(req.params.id).populate("creator");



        res.json(dataAnnonce)
    } catch (error) {

        res.status(400).json({
            error: error.message
        });
    }

});



module.exports = router;