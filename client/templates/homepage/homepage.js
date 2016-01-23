/**
 * Created by youyou on 23/01/16.
 */
Template.homepageTpl.helpers({

    'cards': function() {
        return Meteor.call('getCards');
    }
});