/**
 * Created by youyou on 23/01/16.
 */
Meteor.methods({

    'getCards': function(){
        return result = HTTP.get(
            "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Shaman?locale=frFR",
            {
                headers:{
                    "X-Mashape-Key": "XXX",
                    //"Accept": "application/json"
                }
            }
        ).data;
    }

})