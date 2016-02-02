/**
 * Created by youyou on 01/02/16.
 */

Template.myDecksTpl.helpers ({

    myDecksSettings : function() {
        return {
            collection: Decks.find( {owner_id: Meteor.userId()} ),
            rowsPerPage: 10,
            showFilter: false,
            fields: ['titleDeck','bodyDeck', 'classDeck']
        };
    }
});

Template.myDecksTpl.events({
    'click .reactive-table tbody tr': function(cardObject) {
        Router.go('/feed/'+this._id);
    }
});