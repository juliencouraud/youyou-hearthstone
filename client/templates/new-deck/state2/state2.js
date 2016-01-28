/**
 * Created by youyou on 23/01/16.
 */


Template.newDeckStateTwoTpl.cards = new ReactiveVar([]);
Session.set( 'deck' , new Array() );

const setNewCardIntoDeckSession = (cardObject) => {
    var deck = Session.get('deck');
    var isPushCard = false;
    deck.forEach(function(card){
        if( card._id == cardObject._id ){
            if ( card.qty < 2 ) {
                if(card.rarity == "Legendary"){
                    isPushCard = true;
                    console.log("You can't put more than once a Legendary card in your deck !");
                } else{
                    card.qty++;
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
    }
    Session.set('deck',deck);
};

const removeCardFromDeckSession = (cardObject) => {
    var deck = Session.get('deck');
    var newDeck = new Array();
    deck.forEach(function(card){
       if( card._id == cardObject._id ){
           if( card.qty == 2 ){
               card.qty -= 1;
               newDeck.push(card);
           }
       } else {
           newDeck.push(card);
       }
    });
    Session.set('deck',newDeck);

};


Template.newDeckStateTwoTpl.helpers({

    deckArray: function(){
        return Session.get('deck');
    },

    settingsCardsArray: function() {
        Meteor.call('getCards', function(err, data) {
            Template.newDeckStateTwoTpl.cards.set(data);
        });
        return {
            collection: Template.newDeckStateTwoTpl.cards.get(),
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
        //.css('backgroundImage', 'http://wow.zamimg.com/images/hearthstone/cards/enus/animated/AT_016_premium.gif')
    },

    'mouseover .reactive-table.deck tbody tr': function() {
        var cardObject = this;
        $('.card-selected').attr('src', cardObject.img);
        //.css('backgroundImage', 'http://wow.zamimg.com/images/hearthstone/cards/enus/animated/AT_016_premium.gif')
    }
});