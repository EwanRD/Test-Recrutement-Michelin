const { query } = require("../database/db");

const loadBooks = async () => {
  try {
    console.log("Connexion à la base de données...");
    const books = await query(
      "SELECT titre, auteur, categorie, TO_CHAR(date_parution, 'DD/MM/YYYY') AS date_parution FROM livres"
    );
    console.log("Requête exécutée :", books.rows);
    if (books.rowCount == 0) {
      console.log("pas de livres");
      return { success: false, message: "Aucun livre trouvé", result: [] };
    } else {
      console.log("before loop");
      let bookList = [];
      for (let i = 0; i < books.rowCount; i++) {
        bookList[i] = {
          id: i,
          name: books.rows[i].titre,
          author: books.rows[i].auteur,
          category: books.rows[i].categorie,
          release: books.rows[i].date_parution,
        };
      }
      console.log("after loop");
      return {
        success: true,
        message: "Books loaded with success",
        result: bookList,
      };
    }
  } catch (err) {
    console.error("Erreur lors du chargement des livres :", err);
    return { success: false, message: "Erreur serveur", result: null };
  }
};

const loadBooksBySearch = async (search) => {
  const books = await query(
    "SELECT * FROM livres WHERE titre LIKE $1 OR auteur = $1",
    [`%${search}%`]
  );

  if (books.rowCount == 0) {
    return {
      success: false,
      message: "Aucun livre trouvé pour cette recherche",
      result: null,
    };
  } else {
    let bookList = [];
    for (i = 0; i < books.rowCount; i++) {
      bookList[i] = {
        id: i,
        name: books.rows[i].titre,
        author: books.rows[i].auteur,
        category: books.rows[i].categorie,
        release: books.rows[i].date_parution,
      };
    }
    return {
      success: true,
      message: "Books loaded with success",
      result: bookList,
    };
  }
};

const addBook = async (title, author, category, release) => {
  const search = await query(
    "SELECT titre, auteur, categorie, TO_CHAR(date_parution, 'DD/MM/YYYY') AS date_parution FROM livres WHERE titre = $1 AND auteur = $2",
    [title, author]
  );

  if (search.rowCount != 0) {
    return {
      success: false,
      message: "Ce livre existe déjà dans la base de données",
    };
  } else {
    await query(
      "INSERT INTO livres VALUES($1,$2,$3,TO_DATE($4, 'YYYY-MM-DD'))",
      [title, author, category, release]
    );
    return {
      success: true,
      message: "Livre ajouté avec succès",
    };
  }
};

const deleteBook = async (title, author) => {
  await query("DELETE FROM livres WHERE titre = $1 AND auteur = $2", [
    title,
    author,
  ]);
  return {
    success: true,
    message: "Livre supprimé avec succès",
  };
};

const editBook = async (oldBook, newBook) => {
  await query(
    "UPDATE livres SET titre = $1, auteur = $2, categorie = $3, date_parution = $4 WHERE titre = $5 AND auteur = $6",
    [
      newBook.name,
      newBook.author,
      newBook.category,
      newBook.release,
      oldBook.name,
      oldBook.author,
    ]
  );
  return { success: true, message: "Livre modifié avec succès" };
};

module.exports = {
  loadBooks,
  loadBooksBySearch,
  addBook,
  deleteBook,
  editBook,
};
