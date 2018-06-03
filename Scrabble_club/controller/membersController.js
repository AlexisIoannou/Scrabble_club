/**
 * Controller for the members
 * Does the requires querys and updates
 * when displaying and searching or saving a members
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const Member = require("../models/members");
const Match = require("../models/matches");
const mongoose = require('mongoose');


//gets all members to present them
module.exports.getMembers = function(req, res) {
    Member.find({}, function (err, members){
        if(err)
            res.status(500).send(err);
        else
            res.render('members', {title: 'Member created', members: members});
    })
};

//get member info to edit page
module.exports.getMember= function(req, res) {
    const memberid = mongoose.Types.ObjectId(req.params.id);
    Member.findOne({"_id": memberid}, function (err, member) {
        if(err)
            throw err;
        else
            res.render('updateMember', { title: 'Edit member details', member: member });
    });
};

module.exports.createMember = function(req, res){
    const memberData = req.body;

    const newMember = new Member({
        forename: memberData.forename,
        surname: memberData.surname,
        phone_number: memberData.phone_number,
        wins: 0,
        losses: 0,
        avgScore: 0,
        highest_score: 0
    });

    newMember.save(function(err){
        if(err) {
            res.status(500).send("Member not saved");
        }else {
            res.redirect('/members');
        }
    });
};

module.exports.updateMember = function(req, res){
    const memberData = req.body;

    const memberId = mongoose.Types.ObjectId(req.params.id);

    Member.updateOne({"_id": memberId},
        {$set: {forename: memberData.forename,
                surname: memberData.surname},
                totalGames: memberData.totalGames,
                phone_number: memberData.phone_number},
        function(err){
            if(err) {
                res.status(500).send("Member not saved");
            }else {
                res.redirect('/members');
        }
    });
};

module.exports.deleteMember = function(req, res){
    const memberid = mongoose.Types.ObjectId(req.params.id);
    Member.deleteOne({"_id": memberid}, function (err) {
        if(err)
            throw err;
        else
            res.redirect('/members');
    })
};

//get member info to edit page
module.exports.getProfile = function(req, res) {
    const memberid = mongoose.Types.ObjectId(req.params.id);
    Member.findOne({"_id": memberid}, function (err, profileMember) {
        if (err)
            throw err;
        else {
            const memberid1 = profileMember.bestGame.player1;
            const memberid2 = profileMember.bestGame.player2;
            Member.findOne({"_id": memberid1}, function (err, member1) {
                    if (err)
                        throw err;
                    else {
                        Member.findOne({"_id": memberid2}, function (err, member2) {
                            if (err)
                                throw err;
                            else {
                                res.render('profileMember', {
                                    title: 'Profile page',
                                    profile: profileMember,
                                    member1: member1,
                                    member2: member2
                                });
                            }
                        });
                    };
                })
            };
    });
}
