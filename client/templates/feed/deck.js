/**
 * Created by youyou on 02/02/16.
 */

Template.feedDeckTpl.helpers({

    canDelete: function() {
        if (Meteor.userId() == Decks.findOne({_id: this._id}).owner_id){ return true;}
        else {return false}
    },

    deckOwner: function () {
        var deck = Decks.findOne({_id: this._id});
        if (deck) {return deck.owner_name;}
        else {return 'Unassigned';}
    },

    deckClass: function () {
        var deck = Decks.findOne({_id: this._id});
        if (deck) {return deck.classDeck;}
        else {return 'Unassigned';}
    },

    deckBody: function () {
        var deck = Decks.findOne({_id: this._id});
        if (deck) {return deck.bodyDeck;}
        else {return 'Unassigned';}
    },

    deckTitle: function () {
        var deck = Decks.findOne({_id: this._id});
        if (deck) {return deck.titleDeck;}
        else {return 'Unassigned';}
    },

    deckCards: function() {
        cards = Decks.findOne({_id : this._id}).cards
        Session.set('currentDeck', cards);
        return Session.get('currentDeck');
    },

    settingsCardsArray: function() {
        return {
            rowsPerPage: 30,
            showFilter: false,
            showNavigation: 'never',
            fields: ['name', 'cost', 'rarity', 'qty']
        };
    },

});

Template.feedDeckTpl.events({

    'mouseover .reactive-table.cards tbody tr': function() {
        var cardObject = this;
        $('.card-selected').attr('src', cardObject.img);
    },


    'click .delete-deck': function() {
        console.log(this._id);
        Meteor.call('deleteDeck', this._id);
        Router.go('/admin/decks');
    }

});