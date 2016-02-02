/**
 * Created by youyou on 23/01/16.
 */

Template.homepageTpl.rendered = () => {
    Meteor.subscribe('Decks');
};

Template.homepageTpl.helpers ({

    decks : function() {
        return Decks.find();
    },

    allDecksSettings : function() {
        return {
            collection: Decks.find(),
            rowsPerPage: 10,
            showFilter: true,
            fields: ['_id','titleDeck','bodyDeck', 'classDeck', 'owner_name']
        };
    }
});

Template.homepageTpl.events({

    'click .reactive-table tbody tr': function(cardObject) {
        Router.go('/feed/'+this._id);
    },

    'click .new-deck': function() {
        Router.go('/new/state1');
    }

});