const express = require('express');
const path = require('path');
const app = express();

// Use Railway's PORT or default to 8080
const PORT = process.env.PORT || 8080;

// Serve static files from current directory
app.use(express.static('.'));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});