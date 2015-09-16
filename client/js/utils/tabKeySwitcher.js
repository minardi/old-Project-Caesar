var TabKeySwitcher = function (_context) {
    var that = _context;
    
    this.setTabIndex = function () {
        that.$('.tabIndex').each(function (num, el) {
            el.tabIndex = num + 1;
        });
    };
    
    this.switch = function (e) {
        if (e.keyCode === 9) {
            if (that.$('.tabIndex').last().is(':focus')) {
                e.preventDefault();
                that.$('.name').focus();
            }
        }
    };
    
    return this;
};