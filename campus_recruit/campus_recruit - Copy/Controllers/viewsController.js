
const Job = require('../models/jobModel');
const AppError = require ('./../utils/appError');
const User = require ('./../models/userModel');

exports.getOverview = async (req , res , next) => {

    try {

        // 1) Get job data from collection
    const jobs = await Job.find();

    // 3) Render that template using job data from  1)

    // Passing jobs data into the Overview template
    res.status(200).render('overview' , {

       title: 'All Jobs',
       jobs 

    });

    } catch {

        res.status(404).render('<h1>Page Not Found</h1>');
    }

}    


exports.getJob =  async (req , res , next) =>
 {

        // 1) Get the data, for the requested tour
        const job = await Job.findOne({slug : req.params.slug});
    
        if (!job) {
            return next(new AppError('There is no job with that name.', 404));
        }
      
        // Sending some data to the tour.pug
        res.status(200).render('job', {

            // Placeholder
            title: `${job.name} Job`,
            job
          });

}


exports.getLoginForm = (req , res) => {
    
    // Rendering the login.pug template
    res.status(200).render('login' , {

        title: 'Log into your account'
    });   
}

exports.getSignUpForm = (req , res) => {

    // Rendering the signup.pug template
    res.status(200).render('signup' , {

        title: 'Create your account'
    });  

}

exports.getAccount = (req , res) => {
    
    // Rendering the account.pug template
    res.status(200).render('account' , {

        title: 'Your account'
    });   
}


////////////////////////////////////////////


exports.updateUserData = async (req , res , next) => {
      

    try {

    const updatedUser = await User.findByIdAndUpdate(req.user.id , {

        name: req.body.name,
        email: req.body.email
    },
    {
        new: true, // We want updated data in the updatedUser
        runValidators: true
    });

    res.status(200).render('account' , {

        title: 'Your account',
        user: updatedUser
    });   

    } catch (err) {
        
        console.log(err);
        next(new AppError(err.message , 403));
    }

}
