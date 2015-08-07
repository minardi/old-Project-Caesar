'use strict';
var accountTpl = _.template([
	'<span class="col-sm-6">',
		'<li><span><%= login  %></span> <span><%= role %></span>',
		'<span> <%= locationCity %></span></li>',
	'</span>',
	'<span class="col-sm-6">',
		'<i class="edit glyphicon glyphicon-edit customGlyphBtn"></i>',
		'<i class="dell glyphicon glyphicon-trash customGlyphBtn"></i>',
	'</span>',
].join(''));	