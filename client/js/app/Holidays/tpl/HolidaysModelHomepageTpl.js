var holidaysModelHomepageTpl = _.template([
'   <td><%= name %></td>',
'   <td><%= location %></td>',
'   <td><%= date %></td>',
'   <td class="col-lg-1">',
'       <i class="glyphicon glyphicon-edit customGlyphBtn"></i>',
'       <i class="glyphicon glyphicon-trash customGlyphBtn"></i>',
'   </td>'
].join(''));