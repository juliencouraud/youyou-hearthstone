/**
 * Created by youyou on 23/01/16.
 */

Future = Npm.require('fibers/future');

Meteor.methods({

    getCards: function() {
        var result = new Future();
        HTTP.get(
            "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Shaman?locale=frFR",
            {
                headers: {
                    "X-Mashape-Key": "XXX",
                    //"Accept": "application/json"
                }
            },
            function(err,cards){
                result.return(cards.data)
            }
        );
        return result.wait();
    }
});