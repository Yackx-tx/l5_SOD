# SmartPark CRPMS (Car Repair Management System)

## Project Structure
- `backend-project`: Node.js/Express API with MongoDB
- `frontend-project`: React/Vite with Tailwind CSS

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Installation & Running

### Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   - The server runs on `http://localhost:5000`
   - It will automatically seed default Services if the database is empty.

### Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`

## Usage
1. **Login/Register**: Create a new account on the Login page to access the system.
2. **Cars**: Register incoming vehicles.
3. **Services**: View the catalog of repair services.
4. **Service Records**: Create a new record when a car receives a service.
5. **Payments**: Process payments for unpaid service records.
6. **Reports**: View daily revenues and service bills.
