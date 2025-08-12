# Udyam Registration Clone

This project is a full-stack clone of the Udyam Registration portal (https://udyamregistration.gov.in/UdyamRegistration.aspx) for MSME registration in India.

## Features
- Responsive UI closely matching the official Udyam portal
- Dynamic form rendering for Aadhaar/OTP and PAN steps
- Real-time validation (Aadhaar, OTP, PAN)
- Consent checkbox and info bullets as per the portal
- Backend API (Node.js, Express, Prisma, PostgreSQL) for validation and data storage
- Unit/API tests for backend
- Easy local development and testing

## Tech Stack
- Frontend: Next.js (TypeScript, React)
- Backend: Node.js, Express, Prisma ORM
- Database: PostgreSQL
- Scraper: Node.js (Puppeteer/Cheerio, mock schema for demo)

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (with a database named `udyam`)

### Setup
1. Clone the repo and install dependencies:
   ```sh
   git clone https://github.com/ShrijanSingh/OpenBiz-Project.git
   cd OpenBiz-Project
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Configure your PostgreSQL credentials in `backend/.env`.
3. Run database migrations:
   ```sh
   cd ../backend
   npx prisma migrate dev --name init
   ```
4. Start the backend:
   ```sh
   node index.js
   ```
5. Start the frontend:
   ```sh
   cd ../frontend
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing
- Backend: `cd backend && npm test`

## License
This project is for educational/demo purposes only. Not affiliated with the official Udyam portal.
