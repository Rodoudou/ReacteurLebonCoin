const mongoose = require("mongoose");

const Annonce = mongoose.model("Annonce", {
    title: {
      type: String,
      minlength: 1,
      maxlength: 50,
      required: true
    },
    description:  {
      type: String,
      maxlength: 500
    },
    price: {
      type: Number,
      min: 0,
      max: 100000
    },
    created:{
      type: Date,
      default: Date.now
    },
      // Ci-dessous, nous créons une référence vers un modèle nommé `User`
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Annonce;