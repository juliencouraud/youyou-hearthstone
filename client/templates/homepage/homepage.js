/**
 * Created by youyou on 23/01/16.
 */

Template.homepageTpl.cards = new ReactiveVar([]);
Template.homepageTpl.deck = new ReactiveVar([]);


Template.homepageTpl.helpers({

    settingsCardsArray: function() {
        Meteor.call('getCards', function(err, data) {
            Template.homepageTpl.cards.set(data);
        });
        return {
            collection: Template.homepageTpl.cards.get(),
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'cost', 'rarity']
        };
    },

    settingsDeckArray: function() {
        return {
            collection: Template.homepageTpl.deck.get(),
            rowsPerPage: 30,
            showFilter: false,
            fields: ['name', 'cost', 'rarity']
        };
    }
});

Template.homepageTpl.events({
    'click .reactive-table tbody tr': function (cardObject) {
        var cardObject = this;
        var cards = Template.homepageTpl.deck.get();
        cards.push(cardObject);
        Template.homepageTpl.deck.set(cards);
        console.log(Template.homepageTpl.deck.get());
    }
});