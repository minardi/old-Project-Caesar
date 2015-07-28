var resourcesModelHomepageTpl = _.template([
'   <td><%= name %></td>',
'   <td><%= type %></td>',
'   <td class="col-lg-1">',
'       <i class="glyphicon glyphicon-edit customGlyphBtn edit-style"></i>',
'       <i class="glyphicon glyphicon-trash customGlyphBtn"></i>',
'   </td>'
].join(''));