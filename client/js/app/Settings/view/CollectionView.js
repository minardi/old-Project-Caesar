'use strict';
(function (This) {
    This.CollectionView = Backbone.View.extend({

        createNew: function (e) {
            var ENTER = 13,
                $typeValue = this.$('.new-type');

            if(e.which !== ENTER || !$typeValue.val().trim()){
                return;
            }

            this.collection.create({name: $typeValue.val()});
            $typeValue.val('');
        },

        save: function () {
            var input = this.$('.new-type');

            if(input.val() !== '') {
                this.collection.create({name: input.val()});
            }

            input.val('');
        }
    });
})(App.Settings);