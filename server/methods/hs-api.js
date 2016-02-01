/**
 * Created by youyou on 23/01/16.
 */

Future = Npm.require('fibers/future');

Meteor.methods({

    getCardsForForm: function(classDeck) {
        var result = new Future();
        var array = new Array();
        HTTP.get(
            'https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/'+classDeck,
            {
                headers: {
                    "X-Mashape-Key": "WVbj7PzcbmmshPw7vJDh6s9aKdsBp1O4drujsnT5pTEZaiCzsq",
                    //"Accept": "application/json"
                }
            },
            function(err,cards){
                cards.data.forEach(function(card){
                    if(card.cost && card.type != 'Hero Power'){
                        array.push(card);
                    }
                });

            }
        );
        HTTP.get(
            'https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/Minion',
            {
                headers: {
                    "X-Mashape-Key": "WVbj7PzcbmmshPw7vJDh6s9aKdsBp1O4drujsnT5pTEZaiCzsq",
                    //"Accept": "application/json"
                }
            },
            function(err,cards){
                cards.data.forEach(function(card){
                    if(card.cost && card.type != 'Hero Power' && !card.playerClass && card.rarity){
                        card.playerClass = 'Neutral';
                        array.push(card);
                    }
                });
                result.return(array)
            }
        );
        return result.wait();
    }
});