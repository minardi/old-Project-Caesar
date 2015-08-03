function ResourcesView () {
	this.returnResources = function (resources) {
		return JSON.stringify(resources);
	}

	return this;
}

module.exports = ResourcesView;