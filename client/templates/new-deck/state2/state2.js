/**
 * Created by youyou on 23/01/16.
 */


Template.newDeckStateTwoTpl.cards = new ReactiveVar([]);
Session.set( 'deck' , new Array() );
Session.set( 'nbCardsInDeck' , 0 );

const setNewCardIntoDeckSession = (cardObject) => {
    var deck = Session.get('deck');
    var isPushCard = false;
    if(Session.get('nbCardsInDeck') != 30){
        deck.forEach(function(card){
            if( card._id == cardObject._id ){
                if ( card.qty < 2 ) {
                    if(card.rarity == "Legendary"){
                        isPushCard = true;
                        console.log("You can't put more than once a Legendary card in your deck !");
                    } else{
                        card.qty++;
                        var nbCardsInDeck = Session.get('nbCardsInDeck');
                        nbCardsInDeck++;
                        Session.set('nbCardsInDeck',nbCardsInDeck);
                        if(nbCardsInDeck == 30){
                            $('.submit-deck').removeClass('disabled');
                        }
                        isPushCard = true;
                    }
                } else {
                    isPushCard = true;
                    console.log("You can't put more than twice the same card in your deck !");
                }
            }
        });
        if(!isPushCard){
            deck.push({
                _id : cardObject._id,
                name: cardObject.name,
                cost: cardObject.cost,
                rarity: cardObject.rarity,
                img: cardObject.img,
                qty: 1,
            });
            var nbCardsInDeck = Session.get('nbCardsInDeck');
            nbCardsInDeck++;
            Session.set('nbCardsInDeck',nbCardsInDeck);
            if(nbCardsInDeck == 30){
                $('.submit-deck').removeClass('disabled');
            }
        }
        Session.set('deck',deck);
    } else {
        console.log("Your deck is full !");
    }
};

const removeCardFromDeckSession = (cardObject) => {
    if(Session.get('nbCardsInDeck') == 30){
        $('.submit-deck').addClass('disabled');
    }
    var deck = Session.get('deck');
    var newDeck = new Array();
    deck.forEach(function(card){
        if( card._id == cardObject._id ){
            if( card.qty == 2 ){
                card.qty -= 1;
                newDeck.push(card);
            }
            var nbCardsInDeck = Session.get('nbCardsInDeck');
            nbCardsInDeck--;
            Session.set('nbCardsInDeck',nbCardsInDeck);
        } else {
            newDeck.push(card);
        }
    });
    Session.set('deck',newDeck);
};


Template.newDeckStateTwoTpl.helpers({

    nbCardsInDeck: function(){
        return Session.get('nbCardsInDeck');
    },

    classDeck: function(){
        return Session.get('classDeck');
    },

    deckArray: function(){
        return Session.get('deck');
    },

    settingsCardsArray: function() {
        var classDeck = Session.get('classDeck');
        Meteor.call('getCardsForForm', classDeck, function(err, data) {
            Template.newDeckStateTwoTpl.cards.set(data);
        });
        return {
            collection: Template.newDeckStateTwoTpl.cards.get(),
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name','playerClass', /*'type',*/ 'cost', 'rarity']
        };
    },

    settingsDeckArray: function() {
        return {
            rowsPerPage: 30,
            showFilter: false,
            fields: ['name', 'cost', 'qty']
        };
    },

    errors: function(){
        if( !Session.get('errorsState2') ){
            return null;
        } else {
            return Session.get('errorsState2');
        }
    }
});

Template.newDeckStateTwoTpl.events({

    'click .reactive-table.cards tbody tr': function (cardObject) {
        var cardObject = this;
        setNewCardIntoDeckSession(cardObject);
    },

    'click .reactive-table.deck tbody tr': function (cardObject) {
        var cardObject = this;
        removeCardFromDeckSession(cardObject);
    },

    'mouseover .reactive-table.cards tbody tr': function() {
        var cardObject = this;
        $('.card-selected').attr('src', cardObject.img);
    },

    'mouseover .reactive-table.deck tbody tr': function() {
        var cardObject = this;
        $('.card-selected').attr('src', cardObject.img);
    },

    'click .submit-deck': function() {
        if(Session.get('nbCardsInDeck') == 30) {
            var deckObject = {
                titleDeck : Session.get('titleDeck'),
                bodyDeck : Session.get('bodyDeck'),
                classDeck : Session.get('classDeck'),
                cards : Template.newDeckStateTwoTpl.cards.get(),
                owner: Meteor.userId()
            };

            Meteor.call('insertNewDeck', deckObject);
            Router.go('/');

        } else {
            var errors = new Array();
            errors.push( { message : "Deck submitted doesn't contain 30 cards." } );
            Session.set( 'errorsState2' , errors );
            Router.go('/new/state2');
        }
    }
});