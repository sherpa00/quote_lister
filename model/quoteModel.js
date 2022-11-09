const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    quote: {
        type : String,
        required: true
    }
});

const quoteModel = new mongoose.model("quotes",quoteSchema);

module.exports = quoteModel;