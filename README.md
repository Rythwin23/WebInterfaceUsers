# Application Web de Gestion d'Utilisateurs

## Stack Technique
- **Frontend** : Angular
- **Backend** : Node.js / Express
- **Base de données** : MongoDB

Avant de lancer l'application, avoir :
- **Node.js et npm** : [Télécharge depuis nodejs.org](https://nodejs.org/)
- **Angular CLI** : `npm install -g @angular/cli`

### Démarrer le serveur backend
```bash
cd backend
npm install
node server.js
```
Le serveur sera accessible sur `http://localhost:3000/api`

### Démarrer l'application frontend
```bash
cd frontend
npm install
ng serve
```
L'application sera accessible sur `http://localhost:4200/`

## Fonctionnalités
- Enregistrement de nouveaux utilisateurs via formulaire
- Affichage de tous les utilisateurs dans un tableau
- Suppression d'utilisateurs
