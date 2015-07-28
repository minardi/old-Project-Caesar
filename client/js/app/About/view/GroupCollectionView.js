"use strict";

(function (This) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'About',

        template: groupCollectionTpl,
        contributorsInfo: [
            {
                'id':'0',
                'firstName':'Олег',
                'lastName':'Маньков',
                'contributorTeamId': '0'
            },
            {
                'id':'1',
                'firstName':'Станислав',
                'lastName':'Махницкий',
                'contributorTeamId': '0'
            }],
        cleargroupList: [
            {
                'id': '0',
                'name': 'SharkiUi',
                'itaName': 'Dp-065.UI',
                'courseDirection': 'Web UI'
            },
            {
                'id': '1',
                'name': '.Net',
                'itaName': 'Dp-064.Net',
                'courseDirection': '.Net'

            }],
        initialize: function () {

            this.groupCollection = new This.GroupCollection(this.cleargroupList);
            this.contributorCollection = new This.ContributorCollection(this.contributorsInfo);
            this.groupCollection.fetch();


           this.contributorCollection.once('sync', this.sortContributors, this);
           this.contributorCollection.listenTo(this.groupCollection ,'sync', function () {
              this.fetch();
           });
        },

        render: function () {

            this.$el.html(this.template());

            return this;
        },

        sortContributors: function () {
            this.groupCollection.forEach(function (group) {
                var groupContributors = [],
                    groupId = group.get('id');
                this.contributorCollection.forEach(function (contributor) {
                    if (groupId === contributor.get('contributorTeamId')) {
                        groupContributors.push(contributor);
                    }
                }, this);

                this.addOne(group, groupContributors);
            }, this);
        },

        addOne: function (_group, _contributors) {
            var view = new This.GroupView(_group, _contributors);
            this.$('.list-group-container').append(view.render().el);
        },

        show: function () {
            this.$el.removeClass('hidden');
        }
    });
})(App.About);