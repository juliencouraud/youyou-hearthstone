/**
 * Created by youyou on 23/01/16.
 */

Template.homepageTpl.cards = new ReactiveVar([]);
Session.set( 'deck' , new Array() );




Template.homepageTpl.helpers({

    deckArray: function(){
        return Session.get('deck');
    },

    settingsCardsArray: function() {
        Meteor.call('getCards', function(err, data) {
            Template.homepageTpl.cards.set(data);
        });
        return {
            collection: Template.homepageTpl.cards.get(),
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'type', 'cost', 'rarity']
        };
    },

    settingsDeckArray: function() {
        return {
            rowsPerPage: 30,
            showFilter: false,
            fields: ['name', 'cost', 'qty']
        };
    }
});

Template.homepageTpl.events({
    'click .reactive-table tbody tr': function (cardObject) {
        var cardObject = this;
        var deck = Session.get('deck');
        deck.push({
            name: cardObject.name,
            cost: cardObject.cost,
            qty: 1
        });
        Session.set('deck',deck);
    }
});