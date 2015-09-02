templates.scheduleConfirmTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
        '<div class="modal-dialog modal-lg">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<h4 class="modal-title"><%= message %> </h4>',
                    'What action should be provided?',
                '</div>',
                '<div class="modal-body clearfix">',
                    '<div class="row myRow">',
                        '<div class="btn-group btn-group-justified">',
                            '<a href="#" class="btn btn-default delete">',
                                '<b><i>',
                                '<%= newEvent %>',
                                '</i></b>',
                                '<br>',
                                ' use NEW event ',
                                '<br>',
                                '<%= oldEvent %>',
                            '</a>',
                            '<a href="#" class="btn btn-default cancel">',
                                '<%= newEvent %>',
                                '<br>',
                                ' use OLD event ',
                                '<br>',
                                '<b><i>',
                                '<%= oldEvent %>',
                                '</i></b>',
                            '</a>',
                        '</div>',
                    '</div>',
                    '<div class="row myRow">',
                        '<div class="col-sm-4">',
                            '<div class="checkbox">',
                                '<label>',
                                    '<input type="checkbox">',
                                        'Dont ask again later',
                                    '</input>',
                                '</label>',
                            '</div>',
                        '</div>',
                        '<div class="col-sm-4">',
                        '</div>',                       
                        '<div class="col-sm-4">',
                            '<button type="button" class="btn btn-default cancel">',
                                'Cancel',    
                            '</button>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));