templates.editHolidayTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
	'<div class="modal-dialog animated slideInDown myAnimateClass">',
		'<div class="modal-content">',
			'<div class="modal-header">',
				'<button type="button" class="close cancel"><span aria-hidden="true">&times;</span></button>',
				 '<h4 class="modal-title"><%= (name === "")? "Create holiday": "Edit holiday" %></h4>',
			'</div>',
			'<div class="modal-body clearfix">',
				'<div class="form-group" class="col-xs-4">',
				    '<label for="name">Name of a holiday</label>',
				    '<input type="text" id="name" name="name" class="name form-control holidayName tabIndex" value="<%= name %>" placeholder="type name" >',
			    '</div>',
				'<div class="form-group">',
				   '<label for="locationCountry">Select Country</label>',
					 '<select class="form-control tabIndex" id="selectCountry" name="locationCountry">',
						'<% if (country) { %>',
							'<option selected value="<%= country.id %>">',
								'<%= country.get("countryName") %>',
							'</option>',
						'<% } else {%>',
							'<option></option>',
						'<% }%>',
						'<%_.each(locationCountry, function (country) {%>',
							'<option value="<%= country.id %>">',
								'<%= country.countryName %>',
							'</option>',
						'<% }) %>',
					'</select>',
				'</div>',
				'<div class="form-group" class="col-xs-4">',
					'<label>Choose a date</label>',
						'<div class="input-group" id="datetimepicker">',
						'<input type="text" class="form-control date holidayDate input-group-addon tabIndex" name = "date" id = "date" value="<%= date %>">',
						'<span class="input-group-addon">',
							'<span class="glyphicon glyphicon-calendar"></span>',
						'</span>',
						'</div>',
				'</div>',
		    '</div>',
			'<div class="modal-footer">',
				'<button id="save" type="button" class="btn btn-info save pull-right tabIndex">',
					'<i class="glyphicon glyphicon-floppy-saved"></i> Save',
				'</button>',
				'<button type="button" class="btn btn-default cancel pull-left tabIndex">',
					'<i class="glyphicon glyphicon-floppy-remove"></i> Back',
				'</button>',
			'</div>',
	    '</div>',
	'</div>'
].join(''));