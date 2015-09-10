var User = (function() {
	var role,
	    setRole = 'coordinator';
		
	start();
	
	function start () {
	    $.ajax({
	    type: "GET",
	    dataType: "json",
	    url: "/name",
	    success: function(data){
		    role = data;
          }
	    });	
	};
	
return {
	get: function () {
		return _.clone(role);
	},
	
	role: function () {
	   return setRole;	
	},
	
	set: function (attr) {
		setRole = attr;
	}
};
})();
