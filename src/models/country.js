'use strict';

import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
  countryName: { 
    type: String, required: true, unique: true,
  },
  headOfState: {
    type: String,
  },
  headOfGovernment: {
    type: String,
  },
  typeOfGovernment: {
    type: String,
  },
});

const Country = mongoose.model('country', countrySchema);

export default Country;
