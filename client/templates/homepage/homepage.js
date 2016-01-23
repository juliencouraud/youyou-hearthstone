/**
 * Created by youyou on 23/01/16.
 */

Template.homepageTpl.cards = new ReactiveVar();


Template.homepageTpl.helpers({

    'cards': function() {
        Meteor.call('getCards', function(err, data) {
            Template.homepageTpl.cards.set(data);
        });
        return Template.homepageTpl.cards.get();
    }
});