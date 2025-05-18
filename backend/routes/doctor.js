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

// CREATE Doctor
Router.post('/doctors', async (req, res) => {
  try {
    const { name, specialization, contact, email } = req.body;
    
    // Validate input
    if (!name || !specialization || !contact) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'specialization', 'contact']
      });
    }

    const result = await query(
      'INSERT INTO Doctor (name, specialization, contact, email) VALUES (?, ?, ?, ?)',
      [name, specialization, contact, email]
    );

    res.status(201).json({
      id: result.insertId,
      name, 
      specialization, 
      contact, 
      email,
      message: 'Doctor created successfully'
    });

  } catch (err) {
    console.error('Error creating doctor:', err);
    res.status(500).json({ error: 'Failed to create doctor' });
  }
});

// READ All Doctors
Router.get('/doctors', async (req, res) => {
  try {
    const results = await query('SELECT * FROM Doctor');
    res.status(200).json({ data: results });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// READ Single Doctor
Router.get('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const results = await query('SELECT * FROM Doctor WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ data: results[0] });
  } catch (err) {
    console.error('Error fetching doctor:', err);
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
});

// UPDATE Doctor
Router.put('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, contact, email } = req.body;

    // Validate input
    if (!name || !specialization || !contact) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'specialization', 'contact']
      });
    }

    const result = await query(
      'UPDATE Doctor SET name = ?, specialization = ?, contact = ?, email = ? WHERE id = ?',
      [name, specialization, contact, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({
      id,
      name,
      specialization,
      contact,
      email,
      message: 'Doctor updated successfully'
    });
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.status(500).json({ error: 'Failed to update doctor' });
  }
});

// DELETE Doctor
Router.delete('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM Doctor WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
});

module.exports = Router;