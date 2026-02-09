# SmartPark PSSMS - Deliverables

## 1. Data Model Explanation & Schemas
We have designed the database using **MongoDB** with **Mongoose ODM** to handle the flexible but related data of parking management.

### Relationship Analysis:
1.  **Users**: Standard authentication table.
2.  **ParkingSlots**:
    *   Represents physical spaces.
    *   Independent entity.
3.  **Cars**:
    *   Represents vehicles.
    *   Stored uniquely to avoid data redundancy when the same car visits multiple times.
4.  **ParkingRecords**:
    *   **The Linking Entity**. It connects a `Car` and a `ParkingSlot`.
    *   Captures the *event* of parking.
    *   One Car -> Many ParkingRecords (History).
    *   One Slot -> Many ParkingRecords (Over time).
5.  **Payments**:
    *   Linked directly to a `ParkingRecord` (1:1 for a completed transaction).

### Mongoose Schemas (Abstract):
*   **User**: `username`, `password`, `role`
*   **ParkingSlot**: `slotNumber` (Unique), `slotStatus` ('Available' | 'Occupied')
*   **Car**: `plateNumber` (Unique), `driverName`, `phoneNumber`
*   **ParkingRecord**: `car` (Ref ObjectId), `parkingSlot` (Ref ObjectId), `entryTime`, `exitTime`, `duration`, `status`
*   **Payment**: `parkingRecord` (Ref ObjectId), `amountPaid`, `paymentDate`

---

## 2. Authentication Logic
*   **Session-based Authentication** using `express-session`.
*   Passwords hashed with `bcrypt`.
*   Middleware protects all API routes by checking `req.session.user`.

---

## 3. Aggregation Queries (Reports)

**Daily Payment Report:**
```javascript
db.payments.aggregate([
    {
        $match: {
            paymentDate: { $gte: START_OF_DAY, $lte: END_OF_DAY }
        }
    },
    {
        $lookup: {
            from: 'parkingrecords',
            localField: 'parkingRecord',
            foreignField: '_id',
            as: 'record'
        }
    },
    { $unwind: '$record' },
    {
        $lookup: {
            from: 'cars',
            localField: 'record.car',
            foreignField: '_id',
            as: 'car'
        }
    },
    { $unwind: '$car' },
    {
        $project: {
            plateNumber: '$car.plateNumber',
            entryTime: '$record.entryTime',
            exitTime: '$record.exitTime',
            duration: '$record.duration',
            amountPaid: '$amountPaid'
        }
    }
])
```

---

## 4. Instructions to Run

### Prerequisites
*   Node.js installed.
*   MongoDB installed and running locally.

### Steps
1.  **Backend**:
    ```bash
    cd backend-project
    npm install
    node server.js
    ```
    *   Server starts on port 5000.
    *   **Admin User** (`admin` / `admin123`) and **10 Parking Slots** are automatically seeded on first run.

2.  **Frontend**:
    ```bash
    cd frontend-project
    npm install
    npm run dev
    ```
    *   Open browser at the provided URL (e.g., `http://localhost:5173`).

3.  **Login**:
    *   Username: `admin`
    *   Password: `admin123`
