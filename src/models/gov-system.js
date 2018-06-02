'use strict';

import mongoose from 'mongoose';

const systemSchema = mongoose.Schema({
  countryId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    required: true,
  },
  countryName: { type: String, required: true, unique: true },
  fullName: { type: String },
  capital: { type: String },
  capitalCoordinates: { type: Array },
  independence: { type: String },
  chiefOfState: { type: String },
  headOfGovernment: { type: String },
  electionsExec: { type: String },
  electionResultsExec: { type: String },
  electionsLeg: { type: String },
  electionResultsLeg: { type: String },
  typeOfGovernment: { type: String },
});

const System = mongoose.model('system', systemSchema);

System.create = (countryName, countryId) => {
  return new System({
    countryName,
    countryId,
  }).save();
};

export default System;