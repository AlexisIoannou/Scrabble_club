/**
 * Controller for the leaderboard
 * send the appopriate data to the views
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const Member = require("../models/members");

module.exports.leaderBoard = function(req, res){

    Member.find({'totalGames': {$gte: 10}}, function (err, members) {
        if(err){
            throw err;
        }else {
            members = members.sort(function (member1, member2) {
                return  member2.avgScore - member1.avgScore;
            });

            res.render('index', {title: 'Leaderboard', members: members})
        }
    });
};

//