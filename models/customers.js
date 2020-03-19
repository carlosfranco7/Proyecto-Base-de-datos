const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let customerSchema = new Schema ({
    _id: {
        type: String,
        unique: true,
        required: [true, 'Please add one id']
    },
    Address: {
        type: String,
        required: [true, 'Please add your address']
    },
    City: {
        type: String,
        required: [true, 'Please add your city']
    },
    Country: {
        type: String,
        required: [true, 'Please add your country']
    },
    District: {
        type: String,
        required: [true, 'Please add your district' ]
    },
    FirstName: {
        type: String,
        required: [true, 'Please add your first name']
    },
    LastName: {
        type: String,
        required: [true, 'Please add your last name']
    },
    Status: {
        type: String,
        default: 'Active'
    }
})

module.exports = mongoose.model('customers', customerSchema,'customers');