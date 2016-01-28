/**
 * Created by youyou on 28/01/16.
 */

Template.newDeckStateOneTpl.helpers({

    classes: function(){
        Meteor.call('getClasses', function(err, results){
            Session.set('classes', results);
        });
        return Session.get('classes');
    }

});

Template.newDeckStateOneTpl.events({

    'submit form': (event) => {

        event.preventDefault();

        const form = $(event.currentTarget);

        const titleInput = form.find('[name="title"]');
        const bodyInput = form.find('[name="body"]');
        const classSelect = form.find('[name="yclass"]');

        const titleDeck = titleInput.val();
        const bodyDeck = bodyInput.val();
        const classDeck = classSelect.val();


        Session.set('titleDeck',titleDeck);
        Session.set('bodyDeck',bodyDeck);
        Session.set('classDeck',classDeck);

        Router.go('/new/state2');
    }
});