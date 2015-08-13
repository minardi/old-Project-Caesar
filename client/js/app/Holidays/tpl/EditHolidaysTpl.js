templates.editHolidayTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
    '<div class="modal-dialog modal-md">',
    '    <div class="modal-content">',
    '        <div class="modal-header">',
    '            <h4 class="modal-title">Edit holidays</h4>',
    '        </div>',
    '        <div class="modal-body clearfix">',
    '            <div class="form-group" class="col-xs-4">',
    '                <label for="name">Name of a holiday</label>',
    '                <input type="text" id="name" name="name" class="form-control holidayName" value="<%= name %>" placeholder="type name" >',
    '            </div>',
    '               <div class="form-group">',
                       '<label for="locationCountry">Select Country</label>',
                         '<select class="form-control" id="selectCountry" name="locationCountry">',
                            '<%_.each(locationCountry, function (country) {%>',
                                '<option value="<%= country.id %>">',
                                    '<%= country.name %>',
                                '</option>',
                            '<%})%>',
                        '</select>',
                    '</div>',
    '            <div class="form-group" class="col-xs-4">',
    '                <label>Choose a date</label>',
    '                   <div class="input-group" id="datetimepicker">',
    '                   <input type="text" class="form-control date holidayDate" name = "date" id = "date" value="<%= date%>">',
    '                   <span class="input-group-addon">',
    '                       <span class="glyphicon glyphicon-calendar"></span>',
    '                   </span>',
    '                </div>',
    '            </div>',
    '            <button type="button" class="btn btn-info save pull-right">',
    '              <i class="glyphicon glyphicon-floppy-saved"></i> Save',
    '            </button>',
    '            <button type="button" class="btn btn-default cancel pull-left">',
    '              <i class="glyphicon glyphicon-floppy-remove"></i> Back',
    '            </button>',
    '        </div>',
    '    </div>',
    '</div>'
].join(''));