templates.resourceCollectionTpl = _.template([
    '<div class="panel panel-default">',
        '<div class="panel-heading">',
            '<div class="row">',
                '<div class="col-md-3 col-sm-4">',
                    '<h4>Resources</h4>',
                '</div>',
                '<div class="col-md-5 col-sm-6 col-md-offset-3 col-sm-offset-4">',
                    '<select class="form-control resourceSorting" style="width: 150px; float: right">',
                        '<option disabled selected>Sort by..</option>',
                        '<option value="0">Type</option>',
                        '<option value="1">Name</option>',
                    '</select>',
                '</div>',
                '<div class="col-md-1 col-sm-2">',
                    '<button class="btn btn-success pull-right create">',
                        '<i class="glyphicon glyphicon-plus-sign"></i> Add',
                    '</button>',
                '</div>',
            '</div>',
        '</div>',
        '<table class="table resource-list">',
        '</table>',
    '</div>',
    '<nav>',
        '<ul class="pagination">',
            '<% for (var i = 1; (i <= pageCount) && (pageCount > 1); i++) { %>',
                '<li class="pageEl" value="<%= i %>"><a><%= i %></a></li>',
            '<% }; %>',
        '</ul>',
    '</nav>'
].join(''));