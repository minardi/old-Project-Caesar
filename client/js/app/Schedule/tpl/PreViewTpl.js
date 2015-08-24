templates.preViewScheduleTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
	'<div class="modal-dialog animated slideInDown myAnimateClass">',
		'<div class="modal-content">',
			'<div class="modal-header">',
			    '<button type="button" class="close cancel"><span aria-hidden="true">&times;</span></button>',
				'<h4 class="modal-title">Schedule preview</h4>',
			'</div>',
			'<div class="modal-body clearfix">',
                '<div class="schedule-preview">',
                '</div>',
			'</div>',
			'<div class="modal-footer">',
				'<button id="save" type="button" class="btn btn-info save pull-right">',
					'<i class="glyphicon glyphicon-floppy-saved"></i> Download',
				'</button>',
			'</div>',
		'</div>',
	'</div>'	
].join(''));
