'use strict';
templates.eventCollectionTpl = _.template([
	'<div class="panel panel-default">',
		'<div class="panel-heading">',
			'<div class="row">',
				'<div class="col-md-9 col-sm-8">',
						'<h4>Events</h4>',
				'</div>',
				'<div class="col-md-3 col-sm-4">',
					'<button class="btn btn-success pull-right create add">',
							'<i class="glyphicon glyphicon-plus-sign"></i> Add',
					'</button>',
				'</div>',
                '<select class="form-control resourceSorting" style="width: 150px; float: right">',
                    '<option disabled selected>Sort by..</option>',
                    '<option value="0">Type</option>',
                    '<option value="1">Name</option>',
                '</select>',
			'</div>',
		'</div>',
		'<table class="table event-list list-group">',
		'</table>',
	'</div>'
].join(''));