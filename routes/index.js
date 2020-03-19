const express = require('express');
const app = express();

app.use(require('./customers'));
app.use(require('./rents'));
app.use(require('./listingsAndReviews'))

module.exports = app;