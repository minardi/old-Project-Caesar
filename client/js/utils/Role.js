var Role = function () {
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		
	    return matches ? decodeURIComponent(matches[1]) : undefined;
	}
				
	var cookie = getCookie('account'),
		modifyToObject = cookie.replace(/^j:/g,""),
		loginMan = JSON.parse(modifyToObject);
		
	return loginMan;
	
}