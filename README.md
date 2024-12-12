# 📚 Application de Gestion de Bibliothèque

Ce projet est une application web développée dans le cadre d'un test technique pour un stage chez Michelin. L'application permet de gérer une base de données de livres, offrant des fonctionnalités telles que l'ajout, la modification, la suppression et la recherche de livres. L'objectif est de fournir une interface dynamique et fluide pour la gestion des livres dans une bibliothèque.

---

## 🚀 Fonctionnalités

- **Gestion des livres** :  
  Ajouter, modifier, supprimer et consulter des livres dans la base de données.

- **Filtres avancés** :  
  Rechercher des livres par titre, auteur, catégorie, etc.

- **Visualisation des données** :  
  Afficher des statistiques sur les livres, telles que le nombre de livres par catégorie.

---

## 🛠️ Technologies utilisées

- **Frontend** : React, HTML, CSS
- **Backend** : Node.js, Express
- **Base de données** : PostgreSQL

---

## 🖥️ Architecture de l'application

L'application est composée de trois parties principales :

1. **Frontend** :  
   Développé avec **React**, il est responsable de l'interface utilisateur et de la communication avec le backend via des API RESTful. L'interface est conçue de manière à être réactive et intuitive, avec des composants réutilisables.

2. **Backend** :  
   Le backend utilise **Node.js** avec le framework **Express** pour exposer des API RESTful permettant de gérer les livres (ajout, modification, suppression et consultation). Il assure la communication avec la base de données PostgreSQL.

3. **Base de données** :  
   La base de données **PostgreSQL** est utilisée pour stocker les informations relatives aux livres. Elle est optimisée pour effectuer les opérations CRUD sur la table `livres`.

---

## 📄 Installation et Configuration

### Prérequis

- **PostgreSQL** : S'assurer que PostgreSQL est installé et en cours d'exécution sur votre machine.
- **Node.js et npm** : Veuillez installer **Node.js** (version 14 ou supérieure) et **npm**.

### Étapes d'installation

#### 1. Cloner le projet

Clonez le dépôt GitHub sur votre machine locale :

```bash
git clone https://github.com/EwanRD/Test-Recrutement-Michelin.git
cd Test-Recrutement-Michelin
```

#### 2. Initialisation de la base de données

Connectez-vous à PostgreSQL via le terminal :

```bash
psql -U postgres
```

Exécutez le script SQL pour créer la base de données et la table livres :

```bash
\i backend/database/create.sql
```

#### 3. Lancer le Backend

Accédez au dossier backend :

```bash
cd backend
```

Installez les dépendances nécessaires :

```bash
npm install
```

Vérifiez que le fichier .env contient les bonnes informations de connexion à PostgreSQL. Voici un exemple de configuration :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bibliotheque
DB_USER=admin
DB_PASSWORD=admin
```

Lancez le serveur backend :

```bash
node index.js
```

#### 4. Lancer le Frontend

Accédez au dossier frontend :

```bash
cd ../frontend
```

Installez les dépendances nécessaires pour React :

```bash
npm install
```

Lancez l'application React :

```bash
npm start
```

Accédez à l'application dans votre navigateur à l'adresse suivante :
http://localhost:3000

## 🧑‍💻 Guide d'utilisation

Ajout de livres :
Utilisez le formulaire d'ajout pour entrer un titre, un auteur, une catégorie et une date de publication, puis cliquez sur "Ajouter".

Recherche et filtres :
Utilisez les filtres pour rechercher des livres par titre, auteur ou catégorie.

Visualisation des statistiques :
Consultez les statistiques affichées, telles que le nombre de livres par catégorie, dans le tableau de bord.

## 📝 Détails du projet

Durée de réalisation : Le projet a été réalisé en 7 jours calendaires.
Technologies utilisées :
React pour le frontend, garantissant une interface utilisateur réactive et moderne.
Node.js avec Express pour le backend, facilitant l'intégration des API RESTful.
PostgreSQL pour gérer les données de manière structurée et efficace.

## 🏆 Critères d'évaluation

Le projet sera évalué sur les critères suivants :

Qualité du code : Respect des bonnes pratiques de développement et de la structure du projet.
Documentation : Clarté et complétude de la documentation technique et du guide d'utilisation.
Interface utilisateur : Intuitivité et réactivité de l'interface utilisateur.
Fonctionnalité : Capacité à implémenter les fonctionnalités de manière efficace et optimisée.

## 🙌 Auteur

Développé par Ewan RENÉ-DAGUET.

## Contact

Pour toute question ou remarque, n'hésitez pas à me contacter via l'adresse suivante :
contact@ewan-rene.com.

## Remarques supplémentaires :

Ce projet respecte les exigences spécifiées dans le test technique de Michelin.
L'application est conçue pour être simple à installer et à utiliser, tout en étant extensible pour de futures fonctionnalités.
