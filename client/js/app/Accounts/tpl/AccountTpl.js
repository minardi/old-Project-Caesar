'use strict';
templates.accountTpl = _.template([
'   <td><%= login %></td>',
'   <td><%= role %></td>',
'   <td><%= locationCity %></td>',
//'   <td><%= locationCountry %></td>',
'   <td class="col-lg-1">',
'       <i class="glyphicon glyphicon-edit customGlyphBtn"></i>',
'       <i class="glyphicon glyphicon-trash customGlyphBtn"></i>',
'   </td>'
].join(''));	