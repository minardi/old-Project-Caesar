function setUp (parent, modules) {
    modules.forEach(function (module) {
        parent[module] = {};
    });
};

function isNameTaken (value, collection) {
    var arrayNames = [],
        result;

    collection.forEach(function (element) {
        arrayNames.push(element['name'] || element['countryName']);
    });
                        
    result = _.contains(arrayNames, value);
    return result;
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function validateNameField (value, collection) {
    var errorMsg = {name: 'This name is already taken'},
        properValue = firstToUpperCase(value.trim().toLowerCase());

    return this.isNameTaken(properValue, collection)? errorMsg: undefined;
}

function validateTypesField (value, collection) {
    var errorMsg = {name: 'This name is already taken'};
        return this.isNameTaken(value, collection)? errorMsg: undefined;
}

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

Date.prototype.adjustDate = function(days){
        var date;

        days = days || 0;

        if(days === 0){
            date = new Date( this.getTime() );
        } else if(days > 0) {
            date = new Date( this.getTime() );

            date.setDate(date.getDate() + days);
        } else {
            date = new Date(
                this.getFullYear(),
                this.getMonth(),
                this.getDate() - Math.abs(days),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
};
