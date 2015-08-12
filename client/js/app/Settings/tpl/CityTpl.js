templates.cityTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Cities</p>',
            '</div>',
            '<ul class="cities list-group">',
            '</ul>',
            '<div>',
                '<input class="new-city form-control" type="text"  placeholder="Type">',
            '</div>',
        '</div>'
].join(''));