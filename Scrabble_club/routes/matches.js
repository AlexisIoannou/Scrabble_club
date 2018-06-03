/**
 * Routes for the matches
 * Handles the request and post
 * for the matches
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const express = require('express');
const router = express.Router();
const Member = require('../models/members');

matchesController = require("../controller/matchesController.js");

/* GET record match page. */
router.get('/recordMatch', matchesController.getMatches);

/* Post new member page. */
router.post('/recordMatch', matchesController.recordMatch);


module.exports = router;
