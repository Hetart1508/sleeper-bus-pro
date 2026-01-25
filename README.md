
# Sleeper Bus Ticket Booking System

A full-stack implementation for a premium bus service from Ahmedabad to Mumbai.

## 🚀 7 Core Features

1. **Interactive Sleeper Layout**: Visual grid differentiating between Upper and Lower berths for intuitive selection.
2. **Integrated Meal Booking**: Ability to pre-order fresh meals during the ticket checkout process.
3. **AI Confirmation Prediction**: Real-time forecasting of booking success probability using mock ML logic.
4. **Multi-Step Flow**: Logical separation between seat selection, meal planning, and passenger data.
5. **Route Progress Tracking**: Defined intermediate stations (Nadiad, Vadodara, Surat, Vapi).
6. **Responsive Design**: Mobile-first architecture using Tailwind CSS.
7. **Concurrency Handling**: Backend logic prevents double-booking of seats.

## 🧪 10 Critical Test Cases

| ID | Category | Description | Expected Result |
|----|----------|-------------|-----------------|
| TC01 | Functional | Book a ticket without selecting a meal. | Success (Meal is optional). |
| TC02 | Functional | Book a ticket without selecting a seat. | Fail (Continue button disabled). |
| TC03 | Edge | Select multiple seats from both Upper and Lower berths. | Success (Summary should reflect total). |
| TC04 | Edge | Enter invalid email format in Passenger Info. | Fail (Form validation error). |
| TC05 | Edge | Attempt to book a seat that is already "Booked" (Greyed out). | Fail (Button is disabled). |
| TC06 | UI/UX | Verify Stepper updates on step change. | Current step highlighted correctly. |
| TC07 | UI/UX | Verify mobile responsiveness of seat grid. | Grid stacks or scrolls on small screens. |
| TC08 | Performance | Load bus layout with 30+ seats. | Render time < 100ms. |
| TC09 | ML | Trigger prediction for weekend vs weekday. | Probability reflects higher demand on weekends. |
| TC10 | Functional | Complete checkout and verify Grand Total. | Sum of Seat Price + Meal Price matches. |
