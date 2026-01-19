const express = require('express');
const User = require('../model/User');

const router = express.Router();

// récuperer la liste des utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });  // ordonné par date de création
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// créer un nouvel utilisateur
router.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, companyId, companyPosition } = req.body;

        if (!firstName || !lastName || !companyId || !companyPosition) {
            return res.status(400).json({ message: 'Erreur de saisie, veuillez ressayer.' });
        }

        // Validation
        const lettersOnly = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        if (!lettersOnly.test(firstName) || !lettersOnly.test(lastName)) {
            return res.status(400).json({ message: 'Le nom et prénom doivent contenir seulement des lettres' });
        }

        if (companyId === 0){
            return res.status(400).json({ message: 'ID 0 non utilisable'});
        }

        const newUser = new User({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            companyId,
            companyPosition: companyPosition
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Données invalides' });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Cet ID Entreprise existe déjà' });
        }
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
});

// supprimer un utilisateur existant
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de lutilisateur' });
    }
});

module.exports = router;