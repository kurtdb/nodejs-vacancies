var express = require('express');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var app = express();

app.configure(function(){
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(app.router);
});
 
app.listen(80);
console.log('Listening to port 80');

var Schema = mongoose.Schema;

var vacancySchema = new Schema({
  title:  String,
  author: String,
  type:   String,
  functionDescription: String,
  profile: String,
  offer:  String,
  whoAreWe: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

vacancySchema.methods.findJobByType = function(vacancyType, callback) {
	return this.model('vacancies').find({ type: vacancyType }, cb);
}

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
 });

app.get('/', function(request, response) {
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.find(function(err, vacancies) {
			if (err) {
				mongoose.connection.close();
				
			} else {
				mongoose.connection.close();
				response.send(JSON.stringify(vacancies));
			}
		});
	});
});

// Java part.

app.get('/java', function(request, response) {
	console.log('GET Java');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		vacancies = Vacancy.find('vacancies').where('type').equals('java').exec(function(err, vacancies) {
			if (err) {
				mongoose.connection.close();
				console.log(err);
				response.status(500).json({status: 'failure' });
			} else {
				mongoose.connection.close();
				response.send(JSON.stringify(vacancies));
			}
		});
	});
});

app.post('/java', function(req, res) {
	console.log('POST Java');
	var vacancy;
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		vacancy = new Vacancy({ 
			title: req.body.title, 
			type: 'java', 
			author: req.body.author, 
			functionDescription: req.body.functionDescription,
			profile: req.body.profile,
			offer: req.body.offer,
			whoAreWe: req.body.whoAreWe,
			hidden: false
		});
		vacancy.save(function(err) {
			if (err) {
				console.log(err);
				response.status(500).json({status: 'failure' });
			} else {
				res.status(201).send('Created!');			
			}
			
			mongoose.connection.close();
		});
	});
});

app.put('/java/:id', function(req, res) {
	console.log('PUT Java');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.findById(req.params.id, function(err, vacancy) {
			vacancy.title = req.body.title, 
			vacancy.type = 'java', 
			vacancy.author = req.body.author, 
			vacancy.functionDescription = req.body.functionDescription,
			vacancy.profile = req.body.profile,
			vacancy.offer = req.body.offer,
			vacancy.whoAreWe = req.body.whoAreWe,
			vacancy.hidden = req.body.hidden
			vacancy.save(function(err) {
				if (err) {
					console.log(err);
					response.status(500).json({status: 'failure' });
				} else {
					res.status(201).send('Updated!');			
				}
				
				mongoose.connection.close();
			});			
		});
	});
});

app.delete('/pm/:id', function(request, response) {
	console.log('DELETE pm');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.findById(request.params.id, function(err) {
			Vacancy.remove(function(err) {
				if (err) {
					console.log(err);
					response.status(500).json({status: 'failure' });
				} else {
					response.status(201).send('Removed!');			
				}
				
				mongoose.connection.close();
			});			
		});
	});
});

// Project manager part.

app.get('/pm', function(request, response) {
	console.log('GET PM');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		vacancies = Vacancy.find('vacancies').where('type').equals('pm').exec(function(err, vacancies) {
			if (err) {
				mongoose.connection.close();
				console.log(err);
				response.status(500).json({status: 'failure' });
			} else {
				mongoose.connection.close();
				response.send(JSON.stringify(vacancies));
			}
		});
	});
});

app.post('/pm', function(req, res) {
	console.log('POST pm');
	var vacancy;
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		vacancy = new Vacancy({ 
			title: req.body.title, 
			type: 'pm', 
			author: req.body.author, 
			functionDescription: req.body.functionDescription,
			profile: req.body.profile,
			offer: req.body.offer,
			whoAreWe: req.body.whoAreWe,
			hidden: false
		});
		vacancy.save(function(err) {
			if (err) {
				console.log(err);
				response.status(500).json({status: 'failure' });
			} else {
				res.status(201).send('Created!');			
			}
			
			mongoose.connection.close();
		});
	});
});

app.put('/pm/:id', function(req, res) {
	console.log('PUT pm');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.findById(req.params.id, function(err, vacancy) {
			vacancy.title = req.body.title, 
			vacancy.type = 'pm', 
			vacancy.author = req.body.author, 
			vacancy.functionDescription = req.body.functionDescription,
			vacancy.profile = req.body.profile,
			vacancy.offer = req.body.offer,
			vacancy.whoAreWe = req.body.whoAreWe,
			vacancy.hidden = req.body.hidden
			vacancy.save(function(err) {
				if (err) {
					console.log(err);
					response.status(500).json({status: 'failure' });
				} else {
					res.status(201).send('Updated!');			
				}
				
				mongoose.connection.close();
			});			
		});
	});
});

app.delete('/pm/:id', function(request, response) {
	console.log('DELETE pm');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.findById(request.params.id, function(err) {
			Vacancy.remove(function(err) {
				if (err) {
					console.log(err);
					response.status(500).json({status: 'failure' });
				} else {
					response.status(201).send('Removed!');			
				}
				
				mongoose.connection.close();
			});			
		});
	});
});

// Mobile part.

app.get('/mobile', function(request, response) {
	console.log('GET mobile');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		vacancies = Vacancy.find('vacancies').where('type').equals('mobile').exec(function(err, vacancies) {
			if (err) {
				mongoose.connection.close();
				console.log(err);
				response.status(500).json({status: 'failure' });
			} else {
				mongoose.connection.close();
				response.send(JSON.stringify(vacancies));
			}
		});
	});
});

app.post('/mobile', function(req, res) {
	console.log('POST mobile');
	var vacancy;
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		vacancy = new Vacancy({ 
			title: req.body.title, 
			type: 'mobile', 
			author: req.body.author, 
			functionDescription: req.body.functionDescription,
			profile: req.body.profile,
			offer: req.body.offer,
			whoAreWe: req.body.whoAreWe,
			hidden: false
		});
		vacancy.save(function(err) {
			if (err) {
				console.log(err);
				response.status(500).json({status: 'failure' });
			} else {
				res.status(201).send('Created!');			
			}
			
			mongoose.connection.close();
		});
	});
});

app.put('/mobile/:id', function(req, res) {
	console.log('PUT mobile');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.findById(req.params.id, function(err, vacancy) {
			vacancy.title = req.body.title, 
			vacancy.type = 'mobile', 
			vacancy.author = req.body.author, 
			vacancy.functionDescription = req.body.functionDescription,
			vacancy.profile = req.body.profile,
			vacancy.offer = req.body.offer,
			vacancy.whoAreWe = req.body.whoAreWe,
			vacancy.hidden = req.body.hidden
			vacancy.save(function(err) {
				if (err) {
					console.log(err);
					response.status(500).json({status: 'failure' });
				} else {
					res.status(201).send('Updated!');			
				}
				
				mongoose.connection.close();
			});			
		});
	});
});

app.delete('/mobile/:id', function(request, response) {
	console.log('DELETE mobile');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		var Vacancy = mongoose.model('Vacancy', vacancySchema);
		Vacancy.findById(request.params.id, function(err) {
			Vacancy.remove(function(err) {
				if (err) {
					console.log(err);
					response.status(500).json({status: 'failure' });
				} else {
					response.status(201).send('Removed!');			
				}
				
				mongoose.connection.close();
			});			
		});
	});
});