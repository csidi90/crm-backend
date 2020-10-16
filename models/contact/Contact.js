const mongoose = require('mongoose');
const validator = require('validator');
const contactSchema = new mongoose.Schema(
	{
		title        : {
			type     : String,
			enum     : [
				'Herr',
				'Frau'
			],
			required : true
		},
		firstname    : { type: String, required: true },
		lastname     : { type: String, required: true },
		email        : {
			type      : String,
			required  : false,
			unique    : true,
			lowercase : true,
			validate  : (value) => {
				if (!validator.isEmail(value)) {
					throw new Error({ error: 'Invalid Email address' });
				}
			}
		},
		phone        : {
			type     : String,
			validate : {
				validator : function(v) {
					return /\d{3}-\d{3}-\d{4}/.test(v);
				},
				message   : '{VALUE} is not a valid phone number!'
			},
			required : [
				true,
				'User phone number required'
			]
		},
		mobile_phone : {
			type     : String,
			validate : {
				validator : function(v) {
					return /\d{3}-\d{3}-\d{4}/.test(v);
				},
				message   : '{VALUE} is not a valid phone number!'
			},
			required : false
		},
		position     : { type: String, required: true }
	},
	{ timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
