const mongoose = require('mongoose');
const Customer = require('./customers');
const Listing = require('./listingsAndReviews');

let Schema = mongoose.Schema;

let rentsSchema = new Schema ({
    id: {
        type: String
    },
    customer: {
     type: String, ref: 'customers'
    },
    department: [{     
    type: String, ref: 'listingsAndReviews'
    }]
})

module.exports = mongoose.model('rents', rentsSchema, 'rents' )