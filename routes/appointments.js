const router      = require('express').Router();
const Appointment = require('../models/Appointment');

// ---------- GET all (newest first, with optional filters) ----------
router.get('/', async (req, res) => {
  try {
    const filter = {};

    // Optional query-param filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.date)   filter.date   = req.query.date;

    const list = await Appointment.find(filter).sort({ created: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---------- POST new appointment ----------
router.post('/', async (req, res) => {
  try {
    // Validation — name, phone, service are required
    const { name, phone, service } = req.body;
    const missing = [];
    if (!name)    missing.push('name');
    if (!phone)   missing.push('phone');
    if (!service) missing.push('service');

    if (missing.length) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(', ')}`
      });
    }

    const appt = await new Appointment(req.body).save();
    res.status(201).json(appt);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ---------- PUT update appointment ----------
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'status field is required' });
    }

    const allowed = ['New', 'Confirmed', 'Done', 'Cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed: ${allowed.join(', ')}`
      });
    }

    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    if (!appt) return res.status(404).json({ error: 'Appointment not found' });

    res.json(appt);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ---------- DELETE ----------
router.delete('/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;