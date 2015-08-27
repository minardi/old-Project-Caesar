templates.eventTypeTpl = _.template([
    '<div class="panel panel-default">',
        '<div class="panel-heading">',
            '<p>Events Types</p>',
        '</div>',
        '<ul id="eventsScroll" class="event-type list-group">',
        '</ul>',
        '<div>',
            '<input class="new-type form-control" type="text" placeholder="Type">',
        '</div>',
    '</div>'
].join(''));