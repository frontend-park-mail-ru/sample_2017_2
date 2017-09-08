'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());


const users = {};
const ids = {};

app.post('/auth', function (req, res) {
	const username = req.body.username;
	const email = req.body.email;
	if (!username || !email) {
		return res.status(400).end();
	}
	if (!users[email]) {
		users[email] = {
			username,
			email,
			count: 0,
		};
	}
	const id = uuid();
	ids[id] = email;

	res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.json({id});
});

app.get('/me', function (req, res) {
	const id = req.cookies['podvorot'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].count += 1;

	res.json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
