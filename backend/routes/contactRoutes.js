const express = require('express');
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All contact routes require a valid JWT
router.use(authMiddleware);

// POST /api/contacts – create a contact owned by the logged-in user
router.post('/', async (req, res) => {
    try {
        const contact = await Contact.create({ ...req.body, userId: req.userId });
        res.status(201).json(contact);
    } catch (err) {
        console.error('Create contact error:', err);
        res.status(500).json({ message: 'Failed to create contact.', error: err.message });
    }
});

// GET /api/contacts – return only this user's contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        console.error('Get contacts error:', err);
        res.status(500).json({ message: 'Failed to fetch contacts.', error: err.message });
    }
});

// PUT /api/contacts/:id – update only if contact belongs to this user
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true, returnDocument: 'after' }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.json(contact);
    } catch (err) {
        console.error('Update contact error:', err);
        res.status(500).json({ message: 'Failed to update contact.', error: err.message });
    }
});

// DELETE /api/contacts/:id – delete only if contact belongs to this user
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.json({ message: 'Contact deleted.' });
    } catch (err) {
        console.error('Delete contact error:', err);
        res.status(500).json({ message: 'Failed to delete contact.', error: err.message });
    }
});

module.exports = router;
