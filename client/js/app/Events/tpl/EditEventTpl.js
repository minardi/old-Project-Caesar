templates.editEventTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
	'<div class="modal-dialog animated slideInDown myAnimateClass">',
		'<div class="modal-content">',
			'<div class="modal-header">',
				'<button type="button" class="close cancel"><span aria-hidden="true">&times;</span></button>',
				'<h4 class="modal-title"><%= (name === "")? "Create event": "Edit event" %></h4>',
			'</div>',
			'<div class="modal-body clearfix">',
				'<div class="form-group" class="col-xs-4">',
					'<label for="name">Name</label>',
					'<span class="hint hidden"></span>',
					'<input type="text" name="name" class="name form-control editName tabIndex" value="<%= name %>" placeholder="type name">',
                    '<a class="returnName tabIndex">Return my variant</a>',
				'</div>',
				'<div class="form-group"  data-name="type">',
					'<label>Type:</label>',
					'<span class="hint hidden"></span>',
					'<select size="1" class="type form-control listbox editType tabIndex" name="type">',
						'<option disabled selected>Select type</option>',
						'<%_.each(eventTypes, function (type) {%>',
							'<% if (type.id === typeId) { %>',
								'<option selected value="<%= type.id %>">',
									'<%= type.name %>',
								'</option>',
							'<% } else {%>',
								'<option value="<%= type.id %>">',
									'<%= type.name %>',
								'</option>',
							'<% }%>',
						'<%})%>',
					'</select>',
				'</div>',
				'<div class="row">',
					'<div class="col-md-6">',
						'<h4>Resources in event</h4>',
						'<ul class="resource-field list-group">',
							'<% _.each(resourcesList, function (resourceItem) { %>',
								'<li idValue = "<%= resourceItem.get(\'id\')%>"  class="resource list-group-item" >',
									'<%= resourceItem.get(\'name\')%>',
								'</li>',
							'<% }); %>',
						'</ul>',
					'</div>',
					'<div class="col-md-6 resources-list">',
					'</div>',
				'</div>',
			'</div>',
			'<div class="modal-footer">',
				'<button id="save" type="button" class="btn btn-info save pull-right tabIndex">',
					'<i class="glyphicon glyphicon-floppy-saved"></i> Save',
				'</button>',
				'<button type="button" class="btn btn-default cancel pull-left tabIndex lastTabBtn">',
					'<i class="glyphicon glyphicon-floppy-remove"></i> Back',
				'</button>',
		    '</div>',
		'</div>',
	'</div>'
].join(''));