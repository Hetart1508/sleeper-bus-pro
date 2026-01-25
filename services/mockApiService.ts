
/**
 * Mock API Logic for Backend Functionality
 * Normally these would be separate files (controllers/bookingController.js etc.)
 */

export const mockApi = {
  getSeats: async (busId: string) => {
    // Simulated DB fetch
    return Array.from({ length: 30 }).map((_, i) => ({
      id: `s${i}`,
      number: `${i < 15 ? 'L' : 'U'}${ (i % 15) + 1}`,
      isBooked: Math.random() > 0.8
    }));
  },

  bookTicket: async (payload: any) => {
    console.log('API Request: POST /api/book', payload);
    return { success: true, bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase() };
  },

  getPrediction: (demandFactor: number, currentOccupancy: number) => {
    // Mimics a Random Forest output
    // Probability = (1 - (occupancy * demand)) * 100
    const result = Math.max(5, Math.min(99, (1 - (currentOccupancy * demandFactor)) * 100));
    return Math.floor(result);
  }
};
