'use strict';

import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
  countryName: { 
    type: String, required: true, unique: true,
  },
  headOfState: {
    type: String, required: true,
  },
  headOfGovernment: {
    type: String, requried: true,
  },
  typeOfGovernment: {
    type: String, required: true,
  },
});

const Country = mongoose.model('country', countrySchema);

export default Country;
