var User = (function() {
	var role;
	(function () {
	    $.ajax({
	    type: "GET",
	    dataType: "json",
	    url: "/name",
	    success: function(data){
		    role = data;
          }
	    });	
	})();
	
return {
	get: function () {
		return role;
	}
};
})();
