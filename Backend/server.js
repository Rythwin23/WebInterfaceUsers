const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://STAGE2026:stage2026@usersdata.jhqmowi.mongodb.net/?appName=USERSDATA';

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connecté à MongoDB');
    })
    .catch((error) => {
        console.error('Erreur de connexion à MongoDB:', error);
    });

// Routes
app.use('/api', userRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});