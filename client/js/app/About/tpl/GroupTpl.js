var groupTpl = _.template([
    '<div class="row group-container col-md-6">',
        '<div class="col-md-6 col-sm-6 group-logo-container">',
            '<img class="group-logo img-circle" src="img/logo<%= id %>.jpg">',
        '</div>',
        '<div class="col-md-6 col-sm-6 group-info-container">',
            '<h3 class="group-name"> <%= name %></h3>',
            '<div class="contributors-name-container">',
            '</div>',
        '</div>',
    '</div>'
].join(''));
