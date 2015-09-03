'use strict';
(function (This) {
    This.ResourceTypeCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.resourceTypeTpl,

        events: {
            'keypress .new-type': 'createNew',
            'click .addResSettings': 'save',
            'input .new-type' : 'focus'
        },

        initialize: function () {
            this.model = new This.ResourceType();
            Backbone.Validation.bind(this);
            this.collection = collections.resourceTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
            this.listenTo(this.collection, 'destroy', this.render);
			this.count = 0;
        },

        render: function () {
			this.count = 0;
            this.$el.html(this.tpl);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var resourceTypeView = new App.Settings.ItemView({model: model});
            this.$('.resource-type').append(resourceTypeView.render().el);
			this.count++;
			this.showScroll();

            return this;
        },

        focus: function () {
            this.$('.new-type').focus();
        },

		showScroll: function () {
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 226 + 'px',
			    divHeight = 224 + (45 * this.count),
                $resourceScroll = this.$('#resourceScroll');

			if (divHeight >= docHeight) {
			    $resourceScroll.addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				$resourceScroll.removeClass('showScroll');
			}
		},

        createNew: function (e) {
            var ENTER = 13,
                $input = this.$('.new-type');
                
            if (e.which !== ENTER || !$input.val().trim()) {
                return;
            }
            this.save();
        },

        save: function () {
            var $input = this.$('.new-type'),
                attributes = {
                    name: $input.val().trim()
                };

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                $input.val('');
            }
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
            return validateTypesField(value, collections.resourceTypes.toJSON());
        }
    });
})(App.Settings);