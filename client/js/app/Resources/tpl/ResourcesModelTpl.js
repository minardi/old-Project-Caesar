var resourcesModelTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
    '<div class="modal-dialog modal-md">',
    '    <div class="modal-content">',
    '        <div class="modal-header">',
    '            <h4>Resource information</h4>',
    '        </div>',
    '        <div class="modal-body clearfix">',
    '            <div class="form-group">',
                    '<label>Name :</label></span>',///
                    '<p class="grey" name="name"><%= name %></p>',///
    '            </div>',
    '            <div class="form-group" class="col-xs-4">',
                    '<label>Type :</label>',///
                    '<p class="grey" name="type"><%= type %></p>',
    '            </div>',///
                '<div class="row">',///
                    '<div class="col-md-12">',
                        '<button type="button" class="btn btn-warning pull-left cancel closeModel">',
                            '<i class="glyphicon glyphicon-arrow-left"></i> Back',
                        '</button>',
                        '<button class="btn btn-success pull-right edit">',
                            '<i class="glyphicon glyphicon-edit"></i> Edit',
                        '</button>',
                        '<button type="button" class="btn btn-danger pull-right delete">',
                            '<i class="glyphicon glyphicon-remove"></i> Delete',
                        '</button>',
                    '</div>',
                '</div>',///
    '        </div>',
    '    </div>',
    '</div>'
].join(''));