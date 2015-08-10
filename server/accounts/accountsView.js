function AccountsView () {
	
	this.returnAccount = function (account, req) {
	    if(req.cookies.account.role !== "Admin") {
			account = [];
		}
		return JSON.stringify(account);
	}

	return this;
}

module.exports = AccountsView;