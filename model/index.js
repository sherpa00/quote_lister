const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/starWarsQuote",(err) => {
    if (!err) {
        console.log("Succesfully connected to database");
    } else {
        console.log(err);
    }
})

