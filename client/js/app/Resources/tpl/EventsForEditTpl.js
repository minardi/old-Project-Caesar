templates.eventsForEditTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
        '<div class="modal-dialog myAnimateClass">' ,
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close cancel"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">Current resource used in:</h4>',
                '</div>',
                '<div class="modal-body clearfix">',
                    '<table class="table event-list" onmousedown="return false">',
                    '</table>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));
