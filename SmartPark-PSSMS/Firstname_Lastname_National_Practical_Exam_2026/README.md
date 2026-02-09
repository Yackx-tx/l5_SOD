# SmartPark PSSMS

Parking Space Sales Management System

## How to Run

1.  **Start Database**: Ensure MongoDB is running.
2.  **Start Backend**:
    ```bash
    cd backend-project
    npm install
    node server.js
    ```
3.  **Start Frontend**:
    ```bash
    cd frontend-project
    npm install
    npm run dev
    ```

## Features
*   **Login**: Secure session-based login.
*   **Parking Slots**: View real-time status (Red/Green) of slots.
*   **Entry**: Register a car entering a slot.
*   **Exit**: Calculate fee (500 RWF/hr), process payment, and free up the slot.
*   **Reports**: View daily earnings and parking history.
