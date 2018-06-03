/**
 * Model for the members
 * Defines a schema for the
 * Members to be stored in the database
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */


var mongoose = require('mongoose')
var Match = require("./matches.js")

const Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const MemberSchema = new Schema(
    {
        forename: {type: String, required: true},
        surname: {type: String, required: true},
        phone_number: {type: String},
        wins: {type: Number},
        losses: {type: Number},
        totalGames: {type: Number},
        totalScore: {type: Number},
        highest_score: {type: Number},
        bestGame: {type: Match.schema, ref: 'Match'},
        matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]
        }
);

MemberSchema.set('toObject', {getters: true, virtuals: true});

// Virtual value for total games
MemberSchema.virtual('avgScore')
    .get(function () {
        return (this.totalScore / this.totalGames);
    });

const memberModel = mongoose.model('Member', MemberSchema)

module.exports = memberModel

module.exports.addWin = function(id){
        memberModel.updateOne({"_id": id}, {$inc: {'wins': 1}},
            function (err) {
                if (err) throw err;
        });
};


module.exports.addloss = function(id){
    memberModel.updateOne({"_id": id}, {$inc: {'losses': 1}},
        function (err) {
            if (err) throw err;
        });
};

module.exports.addGameAndTotalScore = function(id, score){
    memberModel.updateOne({"_id": id}, {$inc: {'totalGames': 1, 'totalScore': score}},
        function (err) {
            if (err) throw err;
        });
};

module.exports.updateHighestScore = function (id, score, match){
    memberModel.findOne({"_id": id}, function (err, member) {
        if(err) {
            throw err;
        }else {
            if(member.highest_score < score){
                memberModel.updateOne({"_id": id}, {$set: {highest_score: score, bestGame: match}},
                    function (err) {
                        if (err) throw err;
                    });
            }
        }
    });
};


