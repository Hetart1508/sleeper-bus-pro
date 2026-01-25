
# Booking Prediction Approach

The "Booking Confirmation Probability" is simulated using a logic that mimics a **Random Forest Regressor**. In a production environment, this would be trained on historical ticketing data.

## ML Logic Explained
The model considers three primary features:
1. **Occupancy Rate**: As the bus fills up, the probability of confirming a last-minute waitlist or flexible seat drops.
2. **Day of Week**: Weekends (Sat/Sun) have higher demand, lowering individual confirmation probability for non-premium tiers.
3. **Booking Lead Time**: Bookings made further in advance have higher confirmation stability.

### Formula (Simulated)
`Probability = (Base_Prob + (Day_Modifier) + (Seat_Count_Weight)) * Occupancy_Coefficient`

## Sample JSON Dataset for Training (Mock)
```json
[
  { "day": "Monday", "hour": 14, "occupancy": 0.4, "booked": 1, "confirmed": true },
  { "day": "Sunday", "hour": 22, "occupancy": 0.95, "booked": 1, "confirmed": false },
  { "day": "Friday", "hour": 18, "occupancy": 0.8, "booked": 2, "confirmed": true }
]
```

## Implementation Note
The current frontend implementation in `BookingFlow.tsx` uses a simplified version of this logic to provide immediate feedback to the user during the "Prediction View" step.
