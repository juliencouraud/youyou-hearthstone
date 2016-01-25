/**
 * Created by youyou on 23/01/16.
 */

Future = Npm.require('fibers/future');

Meteor.methods({

    getCards: function() {
        var result = new Future();
        HTTP.get(
            "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Priest",
            {
                headers: {
                    "X-Mashape-Key": "WVbj7PzcbmmshPw7vJDh6s9aKdsBp1O4drujsnT5pTEZaiCzsq",
                    //"Accept": "application/json"
                }
            },
            function(err,cards){
                var array = new Array();
                cards.data.forEach(function(card){
                    if(card.cost){
                        array.push(card);
                    }
                });
                result.return(array)
            }
        );
        return result.wait();
    }
});