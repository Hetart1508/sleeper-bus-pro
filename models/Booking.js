
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  passenger: {
    name: { type: String, required: true },
    age: Number,
    gender: String,
    email: { type: String, required: true }
  },
  selectedSeats: [String],
  meals: [{
    mealId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  bookingStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Confirmed' },
  predictionProbability: Number
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
