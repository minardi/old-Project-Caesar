'use strict';
var eventTpl = _.template([
    '<span class="name"><%= name   %></span>   <span><%= type %></span> ',
	'<button class="dell btn btn-danger pull-right pullRight">',
		'<i class="glyphicon glyphicon-remove"></i> Dell',
	'</button>',
	'<button class="edit btn btn-info pull-right pullRight">',
		'<i class="glyphicon glyphicon-pencil"></i> Edit',
	'</button> '
].join(''));