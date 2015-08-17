'use strict';
templates.eventFullTpl = _.template([
    '<tr class="fullInfo"><td><%= name %></td></tr>',
	'<tr><td><%= type %></td></tr>',
	'<%= resourc %>'
].join(''));