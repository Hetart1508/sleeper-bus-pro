
const Bus = require('../models/Bus');
const Booking = require('../models/Booking');

/**
 * Returns seat availability for a specific bus
 */
exports.getSeats = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus.seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Logic for booking a ticket with meals
 */
exports.bookTicket = async (req, res) => {
  try {
    const { busId, passenger, seats, meals, totalAmount } = req.body;
    
    // Check if seats are still available (Concurrency check)
    const bus = await Bus.findById(busId);
    const unavailable = seats.some(sNum => 
      bus.seats.find(s => s.seatNumber === sNum && !s.isAvailable)
    );
    
    if (unavailable) return res.status(400).json({ message: 'One or more seats already booked' });

    // Mark seats as booked
    await Bus.updateOne(
      { _id: busId, "seats.seatNumber": { $in: seats } },
      { $set: { "seats.$.isAvailable": false } }
    );

    const booking = new Booking({
      busId, passenger, selectedSeats: seats, meals, totalAmount
    });
    
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Mock ML Prediction Function
 * Simulates Random Forest Classification output
 */
exports.getPrediction = (req, res) => {
  const { occupancy, dayOfWeek, hour } = req.query;
  
  // Simulated ML weighting
  let score = 0.9; // Base score
  
  if (occupancy > 0.8) score -= 0.3;
  if (dayOfWeek === '0' || dayOfWeek === '6') score -= 0.2; // High demand weekends
  if (hour > 20) score += 0.1; // Late night bookings tend to be stable
  
  const probability = Math.max(0.1, Math.min(0.99, score)) * 100;
  
  res.json({
    probability: probability.toFixed(2),
    confidence: "High",
    factors: ["Occupancy", "Day of Week"]
  });
};
