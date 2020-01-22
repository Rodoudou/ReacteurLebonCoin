const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost/leboncoin-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true 
    }
);

module.exports = mongoose;