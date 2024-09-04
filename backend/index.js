const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('../routes/bookRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;

//middleware to parse JSON bodies
app.use(express.json());
// Serve static files
app.use(express.static('public'));
// Enable to allow requests from different ports
app.use(cors());


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/booklibrary', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//Routes
app.use('/',bookRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1/:${PORT}`);
});