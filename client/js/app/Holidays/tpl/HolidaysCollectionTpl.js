templates.holidaysCollectionTpl = _.template([
    '<div class="panel panel-default">',
        '<div class="panel-heading">',
            '<div class="row">',
                '<div class="col-md-3">',
                    '<h4>Holidays</h4>',
                '</div>',
                '<div class="btn-group col-md-4" role="group">',
				'<% if(role === "Admin"){%>',
                    '<button type="button" class="all btn btn-default countryFilter">All</button>',
                    '<% _.each(counties, function (country) { %>',
                        '<button type="button" class="<%= country.id %> btn btn-default countryFilter"><%= country.countryName %></button>',
                    '<% }); %>',
				'<% } %>',	
                '</div>',
                '<div class="col-md-4">',
                    '<input type="text" class="form-control searchField" autofocus placeholder="Search">',
                '</div>',
                '<div class="col-md-1">',
                    '<% if(role === "Admin"){%>',
						'<button class="btn btn-success pull-right create">',
							'<i class="glyphicon glyphicon-plus-sign"></i> Add',
						'</button>',
					'<% } %>',
                '</div>',
            '</div>',
        '</div>',
        '<table class="table holidays-list">',
            '<th class="name-header">Name<i class="sort-flag glyphicon glyphicon-sort glyphicon-triangle-bottom"></i></th>',
            '<th class="date-header">Date<i class="sort-flag glyphicon glyphicon-sort"></i></th>',
            '<th class="location-header">Location<i class="sort-flag glyphicon glyphicon-sort"></i></th>',
        '</table>',
    '</div>',
    '<nav>',
    '</nav>'
].join(''));