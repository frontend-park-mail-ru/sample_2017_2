'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));
app.use(express.static('public'));


const users = {};

app.post('/auth', function (req, res) {

});

app.get('/me', function (req, res) {

});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
