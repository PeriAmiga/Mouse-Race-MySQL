const express = require('express');
const cors = require('cors');
const leaderboardRoutes = require('./leaderboard');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', leaderboardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
