/**
 * Created by youyou on 23/01/16.
 */

Template.homepageTpl.cards = new ReactiveVar([]);

Template.homepageTpl.rendered = function () {
    Session.set( 'deck' , new Array() );
    console.log('Rendered: ',Session.get('deck'));
};


Template.homepageTpl.helpers({

    deckArray: function(){
        return Session.get('deck');
        console.log('Helpers: ',Session.get('deck'));
    },

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
            rowsPerPage: 30,
            showFilter: false,
            fields: ['name', 'cost', 'rarity']
        };
    }
});

Template.homepageTpl.events({
    'click .reactive-table tbody tr': function (cardObject) {
        var cardObject = this;
/*
        var cards = Template.homepageTpl.deck.get();

        cards.push(cardObject);
        Template.homepageTpl.deck.set(cards);
        console.log(Template.homepageTpl.deck.get());
*/
        var deck = Session.get('deck');
        deck.push(cardObject);
        console.log(deck);
        Session.set('deck',deck);


    }
});