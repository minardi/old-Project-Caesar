App.BaseModalView = Backbone.View.extend({
    setTabIndex: function () {
        this.$('.tabIndex').each(function (num, el) {
            el.tabIndex = num + 1;
        });
    },
    
    switch: function (e) {
       if (e.keyCode === 9) {
            if (this.$('.tabIndex').last().is(':focus')) {
                e.preventDefault();
                this.$('.name').focus();
            }
        } 
    },
    
    preValidate: function (attributes) {
        var attrName,
            validationResult;

        validationResult = this.model.preValidate(attributes);

        if (validationResult) {
            for (attrName in validationResult) {
                cs.mediator.publish(  
                    'Hint',
                    validationResult[attrName],
                    this.$('[name=' + attrName + ']')
                );
            }
        }
        return validationResult;
    },
    
    changeClassAndCancel: function (mediatorEvent) {
        this.$('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
        setTimeout(function() {
           $('body').css('overflow-y', 'auto');
           cs.mediator.publish(mediatorEvent);
        }, 400);

        $('body').off();
    },
    
    updateOnEnter: function (e) {
        if (e.keyCode === ENTER) {
            this.save();
        }
    },

    closeOnEscape: function (e) {
        if (e.keyCode === ESC) {
            this.cancel();
        }
    }
});