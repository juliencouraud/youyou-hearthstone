/**
 * Created by youyou on 23/01/16.
 */

Future = Npm.require('fibers/future');

Meteor.methods({

    getCards: function() {
        var result = new Future();
        HTTP.get(
            "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Shaman",
            {
                headers: {
                    "X-Mashape-Key": "XXX",
                    //"Accept": "application/json"
                }
            },
            function(err,cards){
                var array = new Array();
                cards.data.forEach(function(card){
                    if(card.cost && card.type != 'Hero Power'){
                        array.push(card);
                    }
                });
                result.return(array)
            }
        );
        return result.wait();
    }
});