templates.resourceCollectionTpl = _.template([
    '<div class="panel panel-default">',
        '<div class="panel-heading">',
            '<div class="row">',
                '<div class="col-md-9 col-sm-8">',
                    '<h4>Resources</h4>',
                '</div>',
                '<div class="col-md-3 col-sm-4">',
                    '<button class="btn btn-success pull-right create">',
                        '<i class="glyphicon glyphicon-plus-sign"></i> Add',
                    '</button>',
                '</div>',
            '</div>',
        '</div>',
        '<table class="table resource-list">',
        '</table>',
    '</div>'
].join(''));