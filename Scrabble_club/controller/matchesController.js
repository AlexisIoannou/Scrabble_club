/**
 * Controller for the matches
 * Does the requires querys and updates
 * when displaying and searching or saving a match
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const Member = require("../models/members");
const Match = require("../models/matches");
const mongoose = require("mongoose");

module. exports.getMatches = function(req, res) {
    Member.find({}, function (err, members){
        if(err)
            res.status(500).send(err);
        else
            res.render('recordMatch', {title: 'Record match', members: members});
    })
};

module.exports.recordMatch = function(req, res){
    const matchData = req.body;

    const newMatch = new Match({
        player1: matchData.player1,
        player2: matchData.player2,
        score_player1: matchData.player1score,
        score_player2: matchData.player2score,
        place: matchData.place
    });

    newMatch.save(function(err){
        if(err)
            res.status(500).send("Match not recorded");
    });

    //create a mongoose type object with id to search the db
    player1Id = mongoose.Types.ObjectId(matchData.player1);
    player2Id = mongoose.Types.ObjectId(matchData.player2);


    //add victory and loss to players
    if( parseInt(matchData.player1score) > parseInt(matchData.player2score)) {
        Member.addWin(player1Id);
        Member.addloss(player2Id);
    }else {
        Member.addloss(player1Id);
        Member.addWin(player2Id);
    }

    //add to total score and total game of each player
    Member.addGameAndTotalScore(player1Id, matchData.player1score)
    Member.addGameAndTotalScore(player2Id, matchData.player2score);

    //update highest scores if better
    Member.updateHighestScore(player1Id, matchData.player1score, newMatch);
    Member.updateHighestScore(player2Id, matchData.player2score , newMatch);
    res.redirect('/members');
};