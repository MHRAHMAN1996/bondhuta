const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
  // Personal Info
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    require: true
  },
  gender: {
    type: String,
  },
  name: {
    firstName: String,
    lastName: String,
  },
  dateOfBirth: {
    type: String,
    // required: true,
  },
  height: {
    type: String,
  },
  religion: {
    type: String,
    // required: true,
  },
  motherTounge: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
  },
  mobile: {
    type: String,
    // required: true,
  },
  maritalStatus: {
    type: String,
    // required: true,
  },
  about: {
    type: String,
    // required: true,
  },

  // Career
  highDegree: {
    type: String,
    // required: true,
  },
  pgUniversity: {
    type: String,
  },
  ugUniversity: {
    type: String,
  },
  workArea: {
    type: String,
    // required: true,
  },
  income: {
    type: String,
  },

  // Family
  familyType: {
    type: String,
  },
  familyStatus: {
    type: String,
  },
  familyIncome: {
    type: String,
  },
  fatherOcp: {
    type: String,
  },
  motherOcp: {
    type: String,
  },
  brother: {
    type: Number,
  },
  sister: {
    type: Number,
  },
  familyLocation: {
    type: String,
  },
  famiyAbout: {
    type: String,
  },

  // Partner
  partnerAgeRange: {
    fromAge: {
      type: Number,
    },
    toAge: {
      type: Number,
    },
  },
  partnerHeightRange: {
    fromHeight: {
      type: Number,
    },
    toHeight: {
      type: Number,
    },
  },
  partnerReligion: {
    type: String,
  },
  partnerMotherTongue: {
    type: String,
  },
  partnerMaritalStatus: {
    type: String,
  },
  partnerIncomeRange: {
    fromIncome: {
      type: Number,
    },
    toIncome: {
      type: String,
    },
  },
  partnerEducation: {
    type: String,
  },
  partnerOccupation: {
    type: String,
  },
  partnerLocation: {
    type: String,
  },
});

schema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

schema.methods.isValid = function(hashedPassword) {
  return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('User', schema);
