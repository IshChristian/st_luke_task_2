const mysql = require('mysql2'); // or your database driver
const express = require('express');
const Router = express.Router();


// 1. Create database connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'st_luke'
});

// 2. Promise-based query helper
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      
      connection.query(sql, params, (error, results) => {
        connection.release(); // Always release connection
        
        if (error) return reject(error);
        resolve(results);
      });
    });
  });
};


// CREATE Appointment
Router.post('/appointments', async (req, res) => {
  try {
    const { pid, did, appointment_date, status = 'scheduled', reason, notes } = req.body;
    
    if (!pid || !did || !appointment_date) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['pid', 'did', 'appointment_date']
      });
    }

    const formattedDate = appointment_date.replace(/\//g, '-');

    const [countResult] = await query(
      'SELECT COUNT(*) as count FROM Appointment WHERE DATE(appointment_date) = DATE(?)',
      [formattedDate]
    );

    const appointmentNumber = countResult.count + 1;

    const result = await query(
      'INSERT INTO Appointment (pid, did, appointment_date, number, status, reason, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [pid, did, formattedDate, appointmentNumber, status, reason, notes]
    );

    res.status(201).json({
      id: result.insertId,
      pid, 
      did,
      appointment_date: formattedDate,
      number: appointmentNumber,
      status,
      reason, 
      notes,
      message: `You are number ${appointmentNumber} in the queue`
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Database operation failed' });
  }
});

// READ All Appointments
Router.get('/appointments', async (req, res) => {
  try {
    const results = await query('SELECT * FROM Appointment');
    res.status(200).json({ data: results });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// UPDATE Appointment
Router.put('/appointments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { pid, did, appointment_date, status, reason, notes } = req.body;

    const result = await query(
      'UPDATE Appointment SET pid = ?, did = ?, appointment_date = ?, status = ?, reason = ?, notes = ? WHERE id = ?',
      [pid, did, appointment_date, status, reason, notes, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE Appointment
Router.delete('/appointments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await query('DELETE FROM Appointment WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = Router;