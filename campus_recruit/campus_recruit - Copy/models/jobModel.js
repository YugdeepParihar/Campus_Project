
const mongoose = require('mongoose');
const validator = require ('validator');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'job must have a name'],
      unique: true,
      trim: true,
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    jobTitle: {
      type: String,
      required: [true, 'job must have a job title']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Job must have a cover image']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDate: [Date],
    Mode: {
      type: String,
      required: [true, 'Job must have a mode'],
      enum: {
        values: ['hybrid', 'remote', 'onsite'],
        message: 'Job can either be : hybrid, remote, onsite'
      }
    },
    city: {
      type: String,
      required: [true, 'Job must have a city location'],
    },
    state: {
      type: String,
      required: [true, 'Job must have a state location'],
    },
    country: {
      type: String,
      required: [true, 'Job must have a country location'],
    },
    applyLink: {
      type: String,
      required: [true, 'There should be a job url']
    },
    expired: {

       type: Boolean,
       required: [true]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

jobSchema.index({ slug: 1 });


// DOCUMENT MIDDLEWARE: runs before .save() and .create()
jobSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//  'Jobs' is the name of the model.
const Jobs = mongoose.model('Jobs', jobSchema);
  
module.exports = Jobs;