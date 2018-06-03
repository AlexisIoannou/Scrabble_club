/**
 * Routes for the leaderboard
 * Handles the request to show the
 * leaderboards
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const express = require('express');
const router = express.Router();

leaderboardController = require("../controller/leaderboardController.js")

/* GET home page with leaderboard. */
router.get('/', leaderboardController.leaderBoard);

module.exports = router;
