const express = require('express');
const Listing = require('../models/listingsAndReviews');
const app = express();

app.get('/property/:desde/:limite', (req, res) => {
    let desde = req.params.desde || 0;
    desde = Number(desde);
    let limi = req.params.limite;
    limi = Number(limi);

    Listing.find({property_type:req.body.property_type})
    .skip(desde)
    .limit(limi)
    .exec((err, rents) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
 
        return res.status(200).json({
            ok: true,
            rents
        });
    });
});

app.get('/price', (req, res) => {
    Listing.find({price:{$gt: req.body.menor, $lt: req.body.mayor}})
    .exec((err, rents) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
 
        return res.status(200).json({
            ok: true,
            rents
        });
    });
})

module.exports = app;