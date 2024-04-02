const express = require ("express");
const path = require ('path');
const jobController = require(path.join(__dirname , '/../Controllers/jobControllers'));
const authController = require(path.join(__dirname , './../Controllers/authController'));

const router = express.Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(jobController.createJob);

router
  .route('/:id')
  .get(authController.isLoggedIn , jobController.getJob)
  .patch(jobController.updateJob)
  .delete(authController.protect , 
    authController.restrictTo('admin'),jobController.deleteJob);
  

module.exports = router;  


