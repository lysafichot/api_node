var User = require('./models/user');
var express     = require('express');
var jwt    = require('jsonwebtoken');
var multer = require('multer');
var upload = multer({ dest: 'up/'});

module.exports = function(app) {
	app.get('/setadmin', function(req, res) {
		var user = new User({
			username: 'lysa',
			email: 'lysa.fichot@epitech.eu',
			admin: true
		});
		user.setPassword('password');

		user.save(function(err) {
			if (err) {
				res.json({ error: true, data: 'Error'});
			} else {
				res.json({error: false, data: 'OK' });
			}
		});
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	//API

	var api = express.Router();

	api.post('/sign', function(req, res) {

		if(!req.body.username) {
			res.json({ error: true, data: 'Please, choose a username'});
		}
		if(!req.body.email) {
			res.json({ error: true, data: 'Please, write your email'});

		}
		if(!req.body.password) {
			res.json({ error: true, data: 'Please, choose a password'});

		}
		var user = new User({
			username: req.body.username,
			email: req.body.email,
			admin: false
		});
		user.setPassword(req.body.password);

		user.save(function(err) {
			if (err) {
				res.json({ error: true, data: 'Error'});
			} else {
				res.json({ error: false, data: 'You are registered'});
			}


		});
	});

	// POST http://localhost:8080/api/auth
	api.post('/auth', upload.single('img'), function(req, res) {
		User.findOne({
			username: req.body.username
		}, function(err, user) {
			console.log(req.file);
			if (err) throw err;
			if (!user || user && !user.checkPassword(req.body.password)) {
				res.json({ error: true, data: 'Authentication failed.' });
			} else if (user && user.checkPassword(req.body.password)) {
				var token = jwt.sign(user, app.get('lyly'), {});

				var data = {};
				data.message = 'Hello'
				res.json({
					error: false,
					data: data,
					token: token
				});

			}
		});
	});
	api.get('/view', function(req, res) {

	});
	// SECURITY TOKEN //
	api.use(function(req, res, next) {

		var token = req.body.token || req.query.token || req.headers['token'];
		if (token) {
			jwt.verify(token, app.get('lyly'), function(err, decoded) {
				if (err) {
					return res.json({ error: true, data: 'Bad token.' });
				} else {
					req.decoded = decoded;
					next(); // queue next routes protected
				}
			});
		} else {
			return res.status(403).send({
				error: true,
				data: 'No token.'
			});

		}
	});

	// GET http://localhost:8080/api/
	api.get('/', function(req, res) {
		res.json({ message: 'API log' });
	});
	//GET http://localhost:8080/api/users
	api.get('/users', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
		/*User.remove();*/
	});


	app.use('/api', api);

};




