const express = require('express');
const Customer = require('../models/customers');
const _ = require('underscore');
const app = express();

app.get('/customers', (req, res) => {
    Customer.find()
   .exec((err, customers) => {
       if(err) {
           return res.status(400).json({
               ok: false,
               err
           });
       }

       return res.status(200).json({
           ok: true,
           customers
       });
   });
});

app.get('/customer', (req, res) => {
    Customer.findOne({_id:req.body._id})
   .exec((err, customer) => {
       if(err) {
           return res.status(400).json({
               ok: false,
               err
           });
       }

       return res.status(200).json({
           ok: true,
           customer
       });
   });
});

app.get('/custcity', (req, res) => {
    Customer.find({City: req.body.City})
   .exec((err, customer) => {
       if(err) {
           return res.status(400).json({
               ok: false,
               err
           });
       }

       return res.status(200).json({
           ok: true,
           customer
       });
   });
});

app.get('/firstname', (req, res) => {
    Customer.findOne({FirstName: req.body.FirstName})
   .exec((err, customer) => {
       if(err) {
           return res.status(400).json({
               ok: false,
               err
           });
       }

       return res.status(200).json({
           ok: true,
           customer
       });
   });
});


app.post('/customer', (req, res) => {
    let body = req.body;

    let customer = new Customer ({
        _id: body._id,
        Address: body.Address,
        City: body.City,
        Country: body.Country,
        District: body.District,
        FirstName: body.FirstName,
        LastName: body.LastName,
        Status: body.Status
    });

    customer.save((err, customerDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });

           
        }
        return res.status(200).json({
            ok: true,
            customerDB
        })
    })
})

app.put('/customer', (req, res) => {
    let _id = req.body._id
    let body = _.pick(req.body,['Address', 'City','Country','District', 'FirstName', 'LastName'])

    Customer.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' }, (err, customerDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            customerDB
        });
    });
})

app.delete('/customer', (req, res) => {
    let _id = req.body._id;
    
    Customer.findByIdAndUpdate(_id, { Status: 'Inactive' }, { new: true, runValidators: true, context: 'query'}, (err, resp) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

            return res.status(200).json({
                ok: true,
                resp
        });
});
});

app.delete('/custid', (req, res) => {
    let _id = req.body._id;

    Customer.deleteOne({ _id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    _id,
                    msg: 'Usuario no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });

})

app.delete('/custname', (req, res) => {
    let FirstName  = req.body.FirstName;

    Customer.deleteOne({FirstName}, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    FirstName,
                    msg: 'Usuario no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });

})


module.exports = app