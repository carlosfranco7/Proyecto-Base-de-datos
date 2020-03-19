const express = require('express');
const Rents = require('../models/rents')
const _ = require('underscore');
const app = express();


 
app.get('/rents', (req,res) => {
    Rents.find().populate('customer').populate('department')
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
 
app.get('/rent', (req,res) => {
    Rents.findOne({id:req.body.id}).populate('customer').populate('department')
    .exec((err, rent) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
 
        return res.status(200).json({
            ok: true,
            rent
        });
    });
});
 
app.post('/rents', (req, res) => {
    let body = req.body

    let rents = new Rents ({
        id: body.id,
        customer: body.customer,
        department: body.department
    })

    rents.save((err, rentDB) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            return res.status(200).json({
                ok: true,
                rentDB,
            });
        });
    })

module.exports = app;

