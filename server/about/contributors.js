exports.getContributorsList = getContributorsList;

var _ = require("../../client/js/lib/underscore.js"),
    groups,
    cleargroupList = [
		 {
             'id': '0',
			 'name': 'DoLoTo',
             'itaName': 'Dp-080.UI',             
			 'courseDirection':'Web UI'
         }   
    ];

function getContributorsList () {
    return groups = _.clone(cleargroupList);
}




