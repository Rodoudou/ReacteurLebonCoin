const mongoose = require("mongoose");

const Annonce = mongoose.model("Annonce", {
    title: String,
    description: String,
    price: Number,
      // Ci-dessous, nous créons une référence vers un modèle nommé `User`
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Annonce;