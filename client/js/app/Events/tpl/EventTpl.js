'use strict';
var eventTpl = _.template([
    '<span><%= name %>  <%= type %></span> ',
	'<button class="dell btn btn-danger pull-right">',
	    '<i class="glyphicon glyphicon-remove"></i> Dell',
    '</button>',
	'<button class="edit btn btn-info pull-right">',
	    '<i class="glyphicon glyphicon-pencil"></i> Edit',
	'</button> '    
].join(''));