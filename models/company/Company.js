const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema(
	{
		name_1   : { type: String, required: true },
		name_2   : { type: String, required: false },
		name_3   : { type: String, required: false },
		street   : { type: String, required: true },
		city     : { type: String, required: true },
		zipcode  : { type: String, required: true },
		contacts : [
			{ type: mongoose.SchemaTypes.ObjectId, ref: 'Contact' }
		]
	},
	{ timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
