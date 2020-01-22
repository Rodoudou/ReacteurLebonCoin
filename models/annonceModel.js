const mongoose = require("mongoose");

const Annonce = mongoose.model("Annonce", {
    title: String,
    description: String,
    price: Number,
    created:String,
      // Ci-dessous, nous créons une référence vers un modèle nommé `User`
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Annonce;