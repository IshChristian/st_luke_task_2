const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

// connection
const connection = require('./config/conn');
connection();

/// middleware
app.use(cors())
app.use(express.json())

// endpoints
const postRoute = require('./routes/postRoute');
const auth = require('./config/auth');
const appointment = require('./routes/appointmentRoute')
const doctorRoutes = require('./routes/doctor');

app.use('/api/doctor', doctorRoutes);
app.use('/api/post', postRoute);
app.use('/api/auth', auth);
app.use('/api/appointment', appointment);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});