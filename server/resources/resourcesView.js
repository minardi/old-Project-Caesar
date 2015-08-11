function ResourcesView () {
	this.returnResources = function (resources, req) {
		var Arr = [];

		// if(req.method === "GET") {
		//     resources.forEach(function(item) {	
		// 		checkCity(item)
		//     });
		// 	resources = Arr;
		// }
		
		// function checkCity (city) {
		// 	if(req.cookies.account.role === "Admin") {
		// 		if (city.location === req.cookies.account.locationCountry) {
		// 			Arr.push(city);
		// 		}
		// 	} else if (city.city === req.cookies.account.locationCity){
		// 		Arr.push(city);
		// 	}	
		// }
		
		return JSON.stringify(resources);
	}

	return this;
}

module.exports = ResourcesView;