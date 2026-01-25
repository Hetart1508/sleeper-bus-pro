
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  type: { type: String, enum: ['Sleeper', 'Seater'], default: 'Sleeper' },
  berth: { type: String, enum: ['Lower', 'Upper'], required: true },
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, required: true }
});

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  route: {
    from: { type: String, required: true },
    to: { type: String, required: true },
    intermediateStations: [String]
  },
  seats: [seatSchema],
  totalCapacity: { type: Number, default: 30 },
  amenities: [String]
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
