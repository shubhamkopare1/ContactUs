const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const sendConfirmationEmail  = require('../utils/sendEmail');
const createContact = async (req, res) => {
  try {
    const { name, email, phone, topic, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      topic,
      message,
    });
    await contact.save();
    await sendConfirmationEmail(email, name)
    res.status(201).json({ message: 'Contact message saved successfully', contact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact message', details: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Math.max(1, parseInt(page, 10));
    limit = Math.max(1, parseInt(limit, 10));

    const contacts = await Contact.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments();

    res.json({ total, page, limit, contacts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact message', details: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact message', details: error.message });
  }
};

module.exports = { createContact, getAllContacts, getContactById, deleteContact };
