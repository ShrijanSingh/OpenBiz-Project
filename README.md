# Udyam Registration Portal Clone

This project is a full-stack clone of the first two steps of the Udyam registration portal, matching the official UI and workflow. It includes:
- Pixel-perfect login interface (React/Next.js, TypeScript)
- Backend API (Node.js/Express, Prisma, PostgreSQL)
- Dynamic form validation and OTP simulation
- End-to-end integration and testing

## Features
- Exact UI replica using provided HTML/CSS
- Dynamic form rendering and validation
- OTP option selection and simulation
- Backend API for form submission and validation
- PostgreSQL database integration
- Jest/Supertest backend tests

## Project Structure
```
OpenBiz Project/
├── frontend/         # Next.js app (React, TypeScript)
│   ├── src/app/UdyamLogin.tsx   # Udyam login React component
│   ├── src/app/page.tsx         # Main page (renders UdyamLogin)
│   ├── public/scraped-form.json # Form schema
│   └── ...
├── backend/          # Express API server
│   ├── index.js      # Main server
│   ├── validate.js   # Validation logic
│   ├── prisma/       # Prisma schema
│   ├── __tests__/    # API tests
│   └── ...
├── scraper/          # (Optional) Puppeteer/cheerio scraper
│   └── index.js
├── styles.css        # Udyam portal CSS
├── udyam-login.html  # Original portal HTML
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### 1. Install Dependencies
```powershell
cd frontend; npm install
cd ../backend; npm install
```

### 2. Setup Database
- Configure PostgreSQL connection in `backend/.env`
- Run Prisma migrations:
```powershell
cd backend; npx prisma migrate dev
```

### 3. Start Backend
```powershell
cd backend; npm start
```

### 4. Start Frontend
```powershell
cd frontend; npm run dev
```

### 5. Test in Browser
- Open [http://localhost:3000](http://localhost:3000) to view the Udyam login UI.

## Testing
- Backend: `cd backend; npm test`
- Frontend: TypeScript lint/build checks

## Notes
- The UI matches the official Udyam portal using provided HTML/CSS.
- OTP is simulated for demo purposes.
- Scraper is optional; form schema is loaded from JSON.

## Assignment Requirements
- Full-stack clone of Udyam portal steps 1 & 2
- Pixel-perfect UI
- Dynamic validation
- API integration
- Testing

## License
MIT
