const express = require('express');
const bodyParser = require('body-parser');
const excel = require('exceljs');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;
const excelFilePath = 'orders.xlsx';

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Create or load the Excel workbook and worksheet
let workbook = new excel.Workbook();
let worksheet;

// Check if the Excel file exists
if (fs.existsSync(excelFilePath)) {
    // If the file exists, load the existing workbook and worksheet
    workbook.xlsx.readFile(excelFilePath)
        .then(() => {
            worksheet = workbook.getWorksheet(1);
            console.log('Existing Excel file loaded.');
        })
        .catch(error => {
            console.error('Error loading Excel file:', error);
        });
} else {
    // If the file doesn't exist, create a new workbook and worksheet
    worksheet = workbook.addWorksheet('Orders');
    worksheet.addRow(['Book ID', 'Name', 'Phone', 'Department', 'Academic Year', 'Payment Method']);
    console.log('New Excel file created.');
}

// Endpoint to handle the order placement
app.post('/place-order', (req, res) => {
    const orderDetails = req.body;
    
    // Add a new row with order details to the worksheet
    worksheet.addRow([
        orderDetails.bookId,
        orderDetails.name,
        orderDetails.phone,
        orderDetails.department,
        orderDetails.academicYear,
        orderDetails.paymentMethod
    ]);

    // Save the workbook to the Excel file
    workbook.xlsx.writeFile(excelFilePath)
        .then(() => {
            console.log('Order details written to Excel file.');
            // Respond with a success message
            res.json({ status: 'success', message: 'Order placed successfully.' });
        })
        .catch(error => {
            console.error('Error writing to Excel file:', error);
            // Respond with an error message
            res.status(500).json({ status: 'error', message: 'Failed to place the order.' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
