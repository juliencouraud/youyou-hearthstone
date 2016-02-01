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
            fields: ['titleDeck','bodyDeck', 'classDeck', 'owner']
        };
    }
});

Template.homepageTpl.events({

    'click .new-deck': function() {
        Router.go('/new/state1');
    }

});