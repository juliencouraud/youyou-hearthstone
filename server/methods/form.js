/**
 * Created by youyou on 28/01/16.
 */
Meteor.methods({

    getClasses: function () {
        return JSON.parse(Assets.getText("classes.json"));;
    },

    insertNewDeck: function(deckObject) {
        Decks.insert(deckObject);
    }

});