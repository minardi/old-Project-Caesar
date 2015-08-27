templates.resourceTypeTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Resources Types</p>',
            '</div>',
            '<ul id="resourceScroll" class="resource-type list-group">',
            '</ul>',
            '<div>',
                '<input class="new-type form-control" type="text"  placeholder="Type">',
            '</div>',
        '</div>'
].join(''));