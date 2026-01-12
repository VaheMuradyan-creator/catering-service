# Catering Service

A full-stack catering service application built with React and Node.js.

## Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Authentication:** JWT, Google OAuth

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

### Development

1. Start the backend server:
```bash
node server.js
```
Backend runs on `http://localhost:3001`

2. Start the frontend development server:
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key-here
```

### Frontend (client/.env)
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GOOGLE_LOGIN_URI=http://localhost:3000
```

## Deployment

This project is configured for Vercel deployment.

## License

ISC
