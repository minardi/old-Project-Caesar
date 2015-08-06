function AccountsView () {
	
	this.returnAccount = function (account) {
		return JSON.stringify(account);
	}

	return this;
}

module.exports = AccountsView;