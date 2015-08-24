'use strict';
templates.eventCollectionTpl = _.template([
	'<div class="panel panel-default toshowfirst col-md-12">',
		'<div class="panel-heading">',
			'<div class="row">',
				'<div class="col-md-3 col-sm-4">',
						'<h4>Events</h4>',
				'</div>',
                '<div class="col-md-5 col-sm-6 col-md-offset-3 col-sm-offset-4">',
                    '<select class="form-control resourceSorting" style="width: 150px; float: right">',
                        '<option disabled selected>Sort by..</option>',
                        '<option value="0">Type</option>',
                        '<option value="1">Name</option>',
                    '</select>',
                '</div>',
				'<div class="col-md-1 col-sm-2">',
					'<button class="btn btn-success pull-right create add">',
							'<i class="glyphicon glyphicon-plus-sign"></i> Add',
					'</button>',
				'</div>',
			'</div>',
		'</div>',
		'<table class="table event-list list-group">',
		'</table>',
	'</div>',
	'<div class="col-md-1"></div>',
	'<div class="panel panel-default col-md-3 toshow hidden">',
	    '<i class="glyphicon glyphicon-remove fullEventClose"></i>',
	    '<div class="panel-heading">',
			'<div class="row">',
				'<div class="col-md-3 col-sm-4">',
						'<h4>Event</h4>',
				'</div>',
			'</div>',
		'</div>',
		'<table class="table fullEvent">',
	    '</table>',
	'</div>',
	'<nav>',
		'<ul class="pagination">',
			'<% for (var i = 1; (i <= pageCount) && (pageCount > 1); i++) { %>',
				'<li class="pageEl" value="<%= i %>"><a><%= i %></a></li>',
			'<% }; %>',
		'</ul>',
	'</nav>'
].join(''));