'use strict';
var menuTpl = _.template([
    '<div class="col-sm-10 col-sm-offset-1">',
        '<ul class="nav nav-pills nav-justified">',
            '<li role="presentation" class="resources menu-item">',
                '<a>Resources</a>',
            '</li>',
            '<li role="presentation" class="events menu-item active">',
                '<a>Events</a>',
            '</li>',
            '<li role="presentation" class="schedule menu-item">',
                '<a>Schedule</a>',
            '</li>',
            '<li role="presentation" class="about menu-item">',
                '<a>About</a>',
            '</li>',
        '</ul>',
    '</div>'
].join(''));