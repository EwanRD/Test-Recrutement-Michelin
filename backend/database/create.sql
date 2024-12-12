-- Création d'un utilisateur avec un mot de passe
CREATE USER admin WITH PASSWORD 'admin';

-- Création de la base de données et assignation d'un propriétaire
CREATE DATABASE bibliotheque OWNER admin;

-- Connexion à la base de données
\c bibliotheque;

-- Création de la table 'livres'
CREATE TABLE livres (
    id SERIAL PRIMARY KEY, -- Ajout d'une colonne ID unique auto-incrémentée
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    categorie VARCHAR(255) NOT NULL,
    date_parution DATE,
    UNIQUE (titre, auteur) -- Garantie qu'un titre et un auteur ne se répètent pas
);

-- Assigner les privilèges à l'utilisateur admin
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
