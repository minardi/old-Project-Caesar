function ResourcesView () {
	this.returnResources = function (resources, req) {
		var Arr = [];

		if(req.method === "GET") {
		    resources.forEach(function(item) {	
				checkCity(item)
		    });
			resources = Arr;
		}
		
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