const express = require('express');
const Contact = require('../../../models/contact/Contact');
const router = express.Router();
const auth = require('../../../middleware/auth');

router.get('/', auth, async (req, res) => {
	let contacts;
	try {
		contacts = await Contact.find();
		res.status(200).json(contacts);
	} catch (error) {
		res.status(404).json(error);
	}
});
router.get('/:id', auth, async (req, res) => {
	let contacts;
	try {
		contacts = await Contact.findById(req.params.id);
		res.status(200).json(contacts);
	} catch (error) {
		res.status(404).json(error);
	}
});

router.post('/', auth, async (req, res) => {
	try {
		let contact = new Contact(req.body);
		await contact.save();
		res.status(200).json(contact);
	} catch (error) {
		res.status(400).json(eror);
	}
});
module.exports = router;
