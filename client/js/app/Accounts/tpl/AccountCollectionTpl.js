'use strict';
var accountCollectionTpl = _.template([
	 '<div class="panel panel-default">',
        '<div class="panel-heading">',
            '<div class="row">',
                '<div class="col-sm-8">',
                    '<h4>Existing Accounts <i class="glyphicon glyphicon-user"></i></h4>',
                '</div>',
                '<div class="col-sm-4">',
                    '<button class="btn btn-success pull-right create">',
                        '<i class="glyphicon glyphicon-plus-sign"></i> Add',
                    '</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>',
    '<ul class="account-list list-group">',
        '</ul>'
].join(''));