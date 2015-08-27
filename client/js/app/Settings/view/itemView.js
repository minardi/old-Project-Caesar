'use strict';
(function (This) {
    This.ItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: templates.itemTpl,

        events:{
            'click .destroy': 'confirmDelete',
			'click .editSetings': 'edit',
            'dblclick': 'edit',
            'keypress .edit-type':	'updateOnEnter',
            'keydown .edit-type': 'revertOnEscape',
            'blur .edit-type': 'save'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        confirmDelete: function () {
            if (this.model.get('countryName')) {
                cs.mediator.publish('Confirm', 
                    'All cities will be deleted in "'  + this.model.get('countryName') + '". Delete in any case?',
                    this.delete.bind(this)); 
            } else {
                this.delete();
            }
        },

        delete: function () {
            this.model.destroy();
            cs.mediator.publish('Notice', 'Item was succesfully deleted');
			cs.mediator.publish('UpdateCountry', this);
			cs.mediator.publish('UpdateRecourse', this);
			cs.mediator.publish('UpdateEvents', this);
			cs.mediator.publish('UpdateCountries', this);
        },

        edit: function () {
            this.$el.addClass('editing');
            this.$('.edit-type').focus();
        },

        save: function () {
            var value = this.$('.edit-type').val().trim();

            if (value) {
                this.model.save({ name: value });
            } else {
                this.delete();
            }

            this.$el.removeClass('editing');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
            if(this.model.get('countryName')){
                cs.mediator.publish('UpdateCountry', this);
            }
        },
        revertOnEscape: function (e) {
            if (e.which === ESC) {
                this.$el.removeClass('editing');
                this.$('.edit-type').val(this.model.get('name'));
            }
        }
    });
})(App.Settings);