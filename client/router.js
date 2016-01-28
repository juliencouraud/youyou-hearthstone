/**
 * Created by youyou on 23/01/16.
 */

Router.route('/', function () {
    this.render('homepageTpl');
});

Router.route('/new/state1', function () {
    var currentUser = Meteor.userId();
    if(currentUser){
        this.render('newDeckStateOneTpl');
    }
    else {
        Router.go('/');
    }
});

Router.route('/new/state2', function () {
    var currentUser = Meteor.userId();
    if(currentUser) {
        this.render('newDeckStateTwoTpl');
    }
    else {
        Router.go('/');
    }
});
