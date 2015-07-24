function ResourcesController (req, res) {
	var view = require('./resourcesView'),
		Resource = require('./resourcesModel').ResourcesModel,
		resourcesView = new view.ResourcesView();

	m.subscribe('resourcesRequestHandeled', responde);

	handle();

	function handle () {
		var resource = new Resource(req);
	}

	function responde (dbQuery) {
		m.unsubscribe('resourcesRequestHandeled', responde);
	
		res.send(resourcesView.returnResources(dbQuery));
	}

	return this;
}

module.exports = ResourcesController;