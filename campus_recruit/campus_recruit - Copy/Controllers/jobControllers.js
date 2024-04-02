const Jobs = require('../models/jobModel');

// ----------- Creating a new Tour ---------
exports.createJob = async (req, res) => {
    try {
    
      const newJob = await Jobs.create(req.body); 
  
      // 201 is for data is created.
      res.status(201).json({
        status: 'sucess',
        data: {
          job: newJob,
        },
      });
    } catch (err) {
      // Error can occur when we are creating a document without required fields.
  
      // 400 stands for bad request
      res.status(400).json({
        status: 'failed',
        message: err,
      });
    }
  };
  
  

  // --------- Reading All The Documents ----------
  
  exports.getAllJobs = async (req, res) => {
    try {
  
      const jobs = await Jobs.find();
  
      res.status(200).json({
        status: 'success',
        results: jobs.length,
        data: {
          jobs,
        },
      });
  
    } catch (err) {
  
      res.status(404).json({
        status: 'fail',
        message: err,
      });
  
    }
  };
  
  // ----------- Reading a Particular Tour ---------
  exports.getJob = async (req, res) => {
    try {
      
      const job = await Jobs.findById(req.params.id);
     
      res.status(200).json({
        status: 'success',
        data: {
          job,
        },
      });
  
    } catch (err) {
  
      res.status(404).json({
        status: 'fail',
        message: err,
      });
  
    }
  };
  
  // ----------- Updating a Particular Tour ---------
  exports.updateJob = async (req, res) => {
    try {
  
      const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return the modified document rather than the original.
        runValidators: true, 
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          job, // sending updated tour.
        },
      });
  
    } catch (err) {
  
      res.status(404).json({
        status: 'fail',
        message: err,
      });
  
    }
  };
  
  // ----------- Deleting a Particular Tour ---------
  exports.deleteJob = async (req, res) => {
    try {

      await Jobs.findByIdAndDelete(req.params.id);
  
      // 204 means no content. and don't send data back instead send null.
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  };
  
  