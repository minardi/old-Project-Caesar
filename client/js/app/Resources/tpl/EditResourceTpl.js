var editResourceTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
    '<div class="modal-dialog modal-md">',
    '    <div class="modal-content">',
    '        <div class="modal-header">',
    // '            <!-- <h4 class="modal-title"><%= message %> </h4> -->'
    '            <h4 class="modal-title">Edit recourses</h4>',
    '        </div>',
    '        <div class="modal-body clearfix">',
    '            <div class="form-group" class="col-xs-4">',
    '                <label for="name">Type name</label>',
    '                <input type="text" id="name" name="name" class="form-control" placeholder="type name of resource">',
    '            </div>',
    '            <div class="form-group">',
    '                <label for="select">Pick one of the resources types:</label>',
    '                <select class="form-control" id="select" size=5 name="type">',
    '                    <%_.each(resourceTypes, function (type) {%>',
    '                       <option value="<%= type.id %>">',
    '                           <%= type.name %>',
    '                       </option>',
    '                   <%})%>',
    '                </select>',
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