const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// SQLite database setup
const db = new sqlite3.Database('orders.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the database');
        // Create orders table if not exists
        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bookId INTEGER,
                name TEXT,
                phone TEXT,
                department TEXT,
                academicYear INTEGER,
                paymentMethod TEXT
            )
        `);
    }
});

// Endpoint to handle order placement
app.post('/place-order', (req, res) => {
    const orderDetails = req.body;

    // Validate and store orderDetails in the database
    db.run(
        `INSERT INTO orders (bookId, name, phone, department, academicYear, paymentMethod)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
            orderDetails.bookId,
            orderDetails.name,
            orderDetails.phone,
            orderDetails.department,
            orderDetails.academicYear,
            orderDetails.paymentMethod
        ],
        function (err) {
            if (err) {
                console.error('Error inserting order into the database:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Order inserted into the database with ID:', this.lastID);
                res.json({ message: 'Order received successfully' });
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
