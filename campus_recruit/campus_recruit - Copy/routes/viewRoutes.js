const express = require('express');
const path = require('path');

const viewsController = require(path.join(__dirname , '../Controllers/viewsController'));

const authController = require(path.join(__dirname , './../Controllers/authController'));

const router = express.Router();

router.get ('/' , authController.isLoggedIn , viewsController.getOverview);


router.get('/job/:slug' , authController.protect ,  viewsController.getJob);

router.get('/login' , authController.isLoggedIn , viewsController.getLoginForm);
router.get('/signup' , authController.isLoggedIn , viewsController.getSignUpForm);

router.get('/me' , authController.isLoggedIn , authController.protect , viewsController.getAccount);


//////////////////////////////////////////

router.post('/submit-user-data' , authController.protect ,viewsController.updateUserData);

module.exports = router;