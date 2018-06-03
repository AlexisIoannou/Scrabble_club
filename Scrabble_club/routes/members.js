/**
 * Routes for the members
 * Handles the request and post
 * for the members
 *
 * @author  Alexis Ioannou
 * @version 1.0
 * @since   2018-06-03
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

Member = require("../models/members");

memberController = require("../controller/membersController.js");

/* Get for the members page*/
router.get('/', memberController.getMembers);

/* GET new member page. */
router.get('/createMember', function(req, res) {
    res.render('createMember', { title: 'Add member' });
});

/* Post new member page. */
router.post('/createMember', memberController.createMember);

/* Get member profile page */
router.get('/profileMember/:id', memberController.getProfile);

/* GET to update member page. */
router.get('/updateMember/:id', memberController.getMember);

/* Post update member page. */
router.post('/updateMember/:id', memberController.updateMember);

/* Post to delete member page. */
router.post('/deleteMember/:id', memberController.deleteMember);

module.exports = router;
