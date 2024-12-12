CREATE TABLE livres (
    titre varchar(255) NOT NULL,
    auteur varchar(255) NOT NULL,
    categorie varchar(255) NOT NULL,
    date_parution Date,
    PRIMARY KEY (titre, auteur)
);