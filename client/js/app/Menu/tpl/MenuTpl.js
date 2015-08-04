'use strict';
var menuTpl = _.template([
'<ul class="menu">',
    '<li role="presentation" class="schedule menu-item">',
        '<span class="glyphicon glyphicon-calendar"></span></br>',
        'Schedule',
    '</li>',
    '<li role="presentation" class="events menu-item">',
        '<span class="glyphicon glyphicon-flag"></span></br>',
        'Events',
    '</li>',
    '<li role="presentation" class="resources menu-item">',
        '<span class="glyphicon glyphicon-tasks"></span></br>',
        'Resources',
    '</li>',
    '<li role="presentation" class="about menu-item">',
        '<span class="glyphicon glyphicon-question-sign"></span></br>',    
        'About',
    '</li>',
    '<li role="presentation" class="logout menu-item">',
        '<span class="glyphicon glyphicon-off"></span></br>',    
        'Log out',
    '</li>',
'</ul>',
].join(''));