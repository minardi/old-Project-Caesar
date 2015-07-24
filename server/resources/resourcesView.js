exports.ResourcesView = function () {

	this.returnResources = function (resources) {
		return JSON.stringify(resources);
	}

	return this;
}