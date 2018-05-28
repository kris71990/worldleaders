'use strict';

import mongoose from 'mongoose';

const systemSchema = mongoose.Schema({
  country: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    required: true,
  },
  countryName: { type: String },
  typeOfGovernment: { type: String },
});

const System = mongoose.model('system', systemSchema);

export default System;
