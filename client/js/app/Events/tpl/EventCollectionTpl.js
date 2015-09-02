templates.eventCollectionTpl = _.template([
	'<div class="panel panel-default toshowfirst col-md-12">',
		'<div class="panel-heading">',
			'<div class="row">',
				'<div class="col-md-6">',
						'<h4>Events</h4>',
				'</div>',
				'<div class="col-md-4">',
					'<input type="text" class="form-control searchField" autofocus placeholder="Search">',
				'</div>',
				'<div class="col-md-2">',
					'<button class="btn btn-success pull-right create add">',
							'<i class="glyphicon glyphicon-plus-sign"></i> Add',
					'</button>',
				'</div>',
			'</div>',
		'</div>',
		'<table class="table event-list list-group">',
			'<tr>',
				'<th class="name-header"><span>Name</span><i class="sort-flag glyphicon glyphicon-triangle-bottom"></i></th>',
				'<th class="type-header"><span>Type</span><i class="sort-flag glyphicon"></i></th>',
			'</tr>',
		'</table>',
		'<nav>',
		'</nav>',
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
	'</div>'
].join(''));