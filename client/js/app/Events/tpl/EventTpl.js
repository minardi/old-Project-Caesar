'use strict';
var eventTpl = _.template([
    '<td><%= name   %></td>',
	'<td><%= type %></td> ',
	'<td class="col-lg-1">',
		'<i class="edit glyphicon glyphicon-edit customGlyphBtn"></i>',
		'<i class="dell glyphicon glyphicon-trash customGlyphBtn"></i>',
	'</td>'
].join(''));