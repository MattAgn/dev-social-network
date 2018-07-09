const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    require: true,
  },
  skills: {
    type: [String],
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  github_username: {
    type: String,
  },
  experience: [{
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    }
  }],
  education: [{
    school: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    field_of_study: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    }
  }],
  socials: {
    twitter: {
      type: String,
    }, 
    facebook: {
      type: String,
    }, 
    linkedin: {
      type: String,
    }, 
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },

  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);