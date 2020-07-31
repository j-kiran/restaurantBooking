const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Booking = require('../../model/Bookings');
const User = require('../../model/User');


// @route     GET api/booking
// @desc      Get all  booking
// @access    private
router.get('/',async (req, res) => {
  try {
    const booking = await Booking.find({}).sort({
      date: -1
    });
    res.json(booking);
  } catch (err) { 
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/booking
// @desc      Add new booking
// @access    private
router.post(
  '/', auth,
  [
    
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }



    
    const { name, email, phone, date } = req.body;

     try {

      const newBooking = new Booking({
        name,
        email,
        phone,
        date
      });

      
      const booking = await newBooking.save();
      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route     PUT api/booking/:id
// @desc      update booking
// @access    private

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone ,date } = req.body;

  //Build booking object
  const bookingFields = {};
  if (name) bookingFields.name = name;
  if (email) bookingFields.email = email;
  if (phone) bookingFields.phone = phone;
  if  (date)bookingFields.date = date;

  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: 'booking not found' });
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: bookingFields },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});


// @route     DEL api/booking/:id
// @desc      DELETE booking
// @access    private
router.delete('/:id',auth, async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: 'booking not found' });
    await Booking.findByIdAndRemove(req.params.id);

    res.json({ msg: 'booking Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});


module.exports = router;