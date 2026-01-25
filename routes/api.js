
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Seat Routes
router.get('/seats/:busId', bookingController.getSeats);

// Booking Routes
router.post('/book', bookingController.bookTicket);
router.get('/predict', bookingController.getPrediction);

// Meal Routes (Simple fetch)
router.get('/meals', (req, res) => {
  res.json([
    { id: '1', name: 'Veg Thali', price: 150 },
    { id: '2', name: 'Paneer Combo', price: 180 }
  ]);
});

module.exports = router;
