'use strict';

import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
  countryName: { type: String, required: true, unique: true },
  location: { type: String },
  area: { type: String },
  areaRank: { type: String },
  population: { type: String },
  populationRank: { type: String },
  lifeExpectancy: { type: String }, 
  lifeExpectancyRank: { type: String },
  gdpPPPRank: { type: String },
  borderCountries: { type: Array },
  naturalResources: { type: Array },
  ethnicities: { type: Array },
  languages: { type: Array },
  religions: { type: Array },
  exports: { type: Array },
  exportPartners: { type: Array },
  imports: { type: Array },
  importPartners: { type: Array },
  typeOfGovernment: { type: String },
  hasLinkedSystem: { type: Boolean },
  govSystem: {
    type: mongoose.Schema.ObjectId,
    unique: true,
  },
});

const Country = mongoose.model('country', countrySchema);

export default Country;
