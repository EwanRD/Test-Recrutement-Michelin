const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  loadBooks,
  loadBooksBySearch,
  addBook,
  deleteBook,
  editBook,
} = require("./functions/books");
// Configuration du serveur
const app = express();
const PORT = 5000;

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/api/loadBooks", async (req, res) => {
  console.log("test");
  try {
    const search = req.body.search;

    if (search == "") {
      const books = await loadBooks();
      if (books.success) {
        res.status(200).json({
          success: true,
          error: false,
          message: books.message,
          bookList: books.result,
        });
      } else {
        res.status(202).json({
          success: false,
          error: false,
          message: books.message,
          bookList: null,
        });
      }
    } else {
      const books = await loadBooksBySearch(search);
      if (books.success) {
        res.status(200).json({
          success: true,
          error: false,
          message: books.message,
          bookList: books.result,
        });
      } else {
        res.status(202).json({
          success: false,
          error: false,
          message: books.message,
          bookList: null,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: true,
      message: err,
      bookList: null,
    });
  }
});

app.post("/api/addBook", async (req, res) => {
  try {
    const { name, author, category, release } = req.body;
    if ({ name, author, category } != null) {
      const add = await addBook(name, author, category, release);

      if (add.success) {
        res
          .status(200)
          .json({ success: add.success, error: false, message: add.message });
      } else {
        res
          .status(202)
          .json({ success: add.success, error: false, message: add.success });
      }
    } else {
      res.status(400).json({
        success: false,
        error: true,
        message: "Le titre, l'auteur et la catégorie doivent être rempli",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: true, message: err.message });
  }
});

app.post("/api/deleteBook", async (req, res) => {
  try {
    const { title, author } = req.body;
    if ((title != null && author != null) || (title != "" && author != "")) {
      const remove = await deleteBook(title, author);
      res
        .status(200)
        .json({ success: true, error: false, message: remove.message });
    } else {
      res.status(400).json({
        success: false,
        error: false,
        message: "Le titre et l'auteur ne peuvent pas être vide",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: true, message: err.message });
  }
});

app.post("/api/editBook", async (req, res) => {
  try {
    const { oldBook, newBook } = req.body;
    if (oldBook != null && newBook != null) {
      const edit = await editBook(oldBook, newBook);
      res
        .status(200)
        .json({ success: edit.success, error: false, message: edit.message });
    } else {
      res
        .status(400)
        .json({
          success: false,
          error: false,
          message: "Les deux versions du livre ne peuvent pas être vides",
        });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: true, message: err.message });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
