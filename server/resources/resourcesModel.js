exports.ResourcesModel = function (req) {
	var _ = require('../../client/js/lib/underscore.js'),
		db = require('../db/db'),
		attributes = {
			id: '',
			name: '',
			type: ''
		},
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		validatedAttributes = validate(req.body),
		dbName = 'resources',
		id = req.params.id;

	actions[req.method]();

	function get () {
		db.fetch(dbName, id);			
	}

	function create () {
		db.create(dbName, validatedAttributes);
	}	

	function update () {
		db.update(dbName, validatedAttributes, id);
	}

	function del () {
		db.remove(dbName, id);
	}
	
	function validate (inputAttributes) {
		var validatedAttributes = {};

		_.each(attributes, function (value, key) {
			validatedAttributes[key] = inputAttributes[key];
		});

		return validatedAttributes;
	}

	return this;
};