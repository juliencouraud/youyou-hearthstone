/**
 * Created by youyou on 28/01/16.
 */



Template.newDeckStateOneTpl.helpers({
    classes: function(){
        Meteor.call('getClasses', function(err, results){
            Session.set('classes', results);
        });
        return Session.get('classes');
    },

    errors: function(){
        if( !Session.get('errorsState1') ){
            return null;
        } else {
            return Session.get('errorsState1');
        }
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

        if(titleDeck != '' && bodyDeck != ''){
            Session.set('titleDeck',titleDeck);
            Session.set('bodyDeck',bodyDeck);
            Session.set('classDeck',classDeck);
            Router.go('/new/state2');
        } else {
            Session.set( 'errorsState1' , new Array() );
            if(titleDeck == ''){
                var errors = Session.get('errorsState1');
                errors.push({ message : "Invalid deck title." });
                Session.set( 'errorsState1' , errors );
            }
            if(bodyDeck == ''){
                var errors = Session.get('errorsState1');
                errors.push( { message : "Invalid deck description." } );
                Session.set( 'errorsState1' , errors );
            }
            Router.go('/new/state1');
        }
    }
});