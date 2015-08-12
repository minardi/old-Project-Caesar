templates.countryTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Countries</p>',
            '</div>',
            '<ul class="countries list-group">',
            '</ul>',
            '<div>',
                '<input class="new-country form-control" type="text"  placeholder="Type">',
            '</div>',
        '</div>'
].join(''));