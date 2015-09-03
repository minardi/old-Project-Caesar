'use strict';
(function (This) {
    This.EventTypeCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.eventTypeTpl,

        events: {
            'keypress .new-type': 'createNew',
            'click .addEventSettings': 'save',
            'input .new-type' : 'focus'
        },

        initialize: function () {
            this.model = this.model || new This.EventType();
            Backbone.Validation.bind(this);
            this.collection = collections.eventTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
        },
        
        render: function () {
            this.count = 0;
            this.$el.html(this.tpl);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            this.$eventType = this.$('.new-type');

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = new App.Settings.ItemView({model: model});
            this.$('.event-type').append(eventTypeView.render().el);
            this.count++;
            this.showScroll();

            return this;
        },

        showScroll: function () {
            var docHeight = $(document).height(),
                boxHeight = docHeight - 226 + 'px',
                divHeight = 140 + 84 + (45 * this.count),
                $eventsScroll = this.$('#eventsScroll');

            if(divHeight >= docHeight) {
                $eventsScroll.addClass('showScroll');
                this.$('.showScroll').css('height', boxHeight)
            } else {
                $eventsScroll.removeClass('showScroll');
            }
        },

        save: function () {
            var $typeValue = this.$('.new-type'),
                attributes = {
                    name: $typeValue.val().trim()
                };

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                $typeValue.val('');
            }
        },

        createNew: function (e) {
            var ENTER = 13,
                $typeValue = this.$('.new-type');

            if(e.which !== ENTER || !$typeValue.val().trim()){
                return;
            }

            this.save();
        },

        focus: function () {
            this.$('.new-type').focus();
        },

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.validateName(attributes.name) || this.model.preValidate(attributes);

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

        validateName: function (value) {
            return validateTypesField(value, collections.eventTypes.toJSON());
        }

    });
})(App.Settings);