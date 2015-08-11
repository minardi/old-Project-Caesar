function ResourcesView () {
	this.returnResources = function (resources, req) {
		var Arr = [];

		function checkCity (city) {
			if(globalMan[req.cookies.clientId].role === "Admin") {
                Arr = resources;
			} else if (city.city === globalMan[req.cookies.clientId].locationCity){
				Arr.push(city);
			}	
		}
		
		return JSON.stringify(resources);
	}

	return this;
}

module.exports = ResourcesView;