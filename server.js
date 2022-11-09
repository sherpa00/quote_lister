const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./model");
const mongoose = require("mongoose");
const quoteModel = require("./model/quoteModel");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");



app.get("/",(req,res) => {
    quoteModel.find({},(err,docs) => {
        if (!err) {
            res.render("index",{
                quotes : docs
            })
        } else {

        }
    })
});

app.get("/:id",(req,res) => {
    quoteModel.find({},(err,docs) => {
        if (!err) {
            res.render("index",{
                quotes : docs
            })
        } else {
            console.log("Error okay");
        }
    })
});



app.post("/",(req,res) => {

    let quoteModelObj = new quoteModel;
    quoteModelObj.name = req.body.name;
    quoteModelObj.quote = req.body.quote;
    quoteModelObj.save((err,docs) => {
        if (!err) {
            console.log("quote added");
            res.redirect("/");
        } else {
            console.log("Error catched");
        }
    })
    
});

app.post("/edit/:id",(req,res) => {
    let id = req.params.id;
    // update by find the id
    quoteModel.findByIdAndUpdate(id,{quote : req.body.quote, name : req.body.name },(err) => {
        if (!err) {
            res.redirect("/");
        } else {
            console.log(err);
        }
    })
})

app.get("/edit/:id",(req,res) => {
    let id = req.params.id;
    let valid = mongoose.Types.ObjectId(id);
    
    if (valid) {
        quoteModel.findById(req.params.id,(err,doc) => {
            if (!err) {
                res.render("edit",{
                    quote : doc
                })
            } else {
                console.log(err);
            }
        })
    }
})

app.post("/remove/:id",(req,res) => {
    let id = req.params.id;
    console.log("Delte one");

    quoteModel.findByIdAndRemove(id,(err) => {
        if (!err) {
            console.log("Quote Removed");
            res.redirect("/");
        }
    })
})


app.post("/deleteall",(req,res) => {
    console.log("Delete all");
    quoteModel.deleteMany((err) => {
        if (!err) {
            console.log("Removed all quotes");
            res.redirect("/");
        }
    })
})

app.listen(3000,() => {
    console.log("Server is listening at 3000...");
});
