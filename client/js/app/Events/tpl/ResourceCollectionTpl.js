templates.resourseCollectionTpl = _.template([
    '<h4>Resources free</h4>',
    '<div class="btn-group" role="group">',
        '<button type="button" class="all btn btn-default typeFilter" filter="all">All</button>',
        '<% _.each(types, function (type) { %>',
            '<button type="button" class="btn btn-default typeFilter" filter="<%= type.id %>"><%= type.name %></button>',
        '<% }); %>',
    '</div>',
    '<ul class="list-group">',
    '</ul>',
    '<nav>',
    '</nav>'
].join(''));