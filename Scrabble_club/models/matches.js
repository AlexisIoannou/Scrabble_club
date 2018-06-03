/**
 * Model for the matches
 * Defines a schema for the
 * Matches to be stored in the database
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const mongoose = require('mongoose');
const Member = require('../models/members');

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const MatchSchema = new Schema(
    {
        player1: {type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true},
        player2: {type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true},
        place: {type: String},
        score_player1: {type: Number, required: true},
        score_player2: {type: Number, required: true},
        date: {type: Date, default: Date.now()}
    }
);

const matchModel = mongoose.model('Match', MatchSchema);

module.exports = matchModel;

module.exports.schema = MatchSchema;

