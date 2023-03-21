// server.js
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

// API route handler
app.get('/api/hello', (req, res) => {
    res.send('Hello from the API!');
  });

// Handle other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'./build/index.html'));
});

// Start the server
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Run the build command to create the production build of the React app
// For example, if you're using create-react-app, run this command in the "my-app" directory:
// npm run build