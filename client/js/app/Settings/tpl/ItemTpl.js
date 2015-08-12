templates.itemTpl = _.template([
    '<div class="view">',
        '<label class="label-type"><%= name %></label>',
        '<button class="destroy"></button>',
    '</div>',
    '<input class="edit-type" value="<%= name %>">'
].join(''));