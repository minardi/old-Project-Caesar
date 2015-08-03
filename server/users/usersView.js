function UsersView () {
	
	this.returnUser = function (user) {
		return JSON.stringify(user);
	}

	return this;
}

module.exports = UsersView;