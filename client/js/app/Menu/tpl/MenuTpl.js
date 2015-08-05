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
    '<li role="presentation" class="settings menu-item">',
        '<span class="glyphicon glyphicon-cog"></span></br>',    
        'Settings',
    '</li>',
    '<li role="presentation" class="createAccount menu-item">',
        '<span class="glyphicon glyphicon-user"></span></br>',    
        'Sign up',
    '</li>',
    '<li role="presentation" class="about menu-item">',
        '<span class="glyphicon glyphicon-question-sign"></span></br>',    
        'Reference',
    '</li>',
    '<li role="presentation" class="contributors menu-item">',
        '<span class="glyphicon glyphicon-piggy-bank"></span></br>',    
        'Contributors',
    '</li>',
'</ul>',
].join(''));