 exports.EventsModel = function (newAttributes) {
	var _ = require('../../client/js/lib/underscore.js'),
		db = require('../db/db'),
		attributes = {
			id: '',
			name: '',
			type: '',
			resources: []
		};
	
	function setModel () {
		_.each(attributes, function (value, key) {
			var isValidated = validateField(value, key);

			if (isValidated) {
				attributes[key] = newAttributes[key]
			}
			validatedAttributes[key] = inputAttributes[key];
		});

		return validatedAttributes;
	}

	function validateField (value, key) {
		if (attributes[key] !== undefined) {
			return true;
		}
	}

	function toJSON () {
		return _.clone(attributes);
	} 

	return this;
};