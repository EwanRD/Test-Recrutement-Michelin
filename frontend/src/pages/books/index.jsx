import React, { useEffect, useState } from "react";
import "../../assets/css/root.css";
import "./books.css";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import Book from "../../components/book";
import { data, Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [hover, setHover] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayType, setOverlayType] = useState(null); // null, 'add', ou 'edit'
  const [newBook, setNewBook] = useState({
    id: null,
    name: "",
    author: "",
    category: "",
    release: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/loadBooks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: "" }),
        });

        const data = await response.json();

        if (data.success) {
          console.log("success");
          setBooks(data.bookList);
        } else {
          console.error(
            "Erreur lors du chargement des livres : ",
            data.message || "Erreur inconnue"
          );
        }
      } catch (err) {
        console.error("Erreur réseau ou serveur :", err);
      }
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleOpenAddOverlay = () => {
    setOverlayType("add");
    setNewBook({ id: null, name: "", author: "", category: "", release: "" }); // Réinitialisation des champs
    setIsOverlayOpen(true);
  };

  const handleOpenEditOverlay = (index) => {
    const bookToEdit = books[index];
    setOverlayType("edit");
    setNewBook({
      id: index,
      name: bookToEdit.name,
      author: bookToEdit.author,
      category: bookToEdit.category,
      release: bookToEdit.release,
    });
    setIsOverlayOpen(true);
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Livre ajouté avec succès !");
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setNewBook({
          id: null,
          name: "",
          author: "",
          category: "",
          release: "",
        });
        setIsOverlayOpen(false);
      } else {
        console.error("Erreur lors de l'ajout du livre :", data.message);
      }
    } catch (err) {
      console.error("Erreur réseau ou serveur :", err);
    }
  };

  const handleSaveBook = async () => {
    if (newBook.id !== null) {
      const oldBook = books[newBook.id];
      console.log(oldBook);
      const response = await fetch("http://localhost:5000/api/editBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldBook: oldBook, newBook: newBook }),
      });

      const data = await response.json();

      console.log(data.success);
      if (data.success) {
        // Mise à jour d'un livre existant
        const updatedBooks = [...books];
        updatedBooks[newBook.id] = { ...newBook };
        setBooks(updatedBooks);
      }
    }
    setNewBook({ id: null, name: "", author: "", category: "", release: "" });
    setIsOverlayOpen(false);
  };

  const handleDeleteBook = async (index) => {
    try {
      if (index != null) {
        const book = books[index];
        const response = await fetch("http://localhost:5000/api/deleteBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: book.name, author: book.author }),
        });

        const data = await response.json();

        if (data.success) {
          setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
          console.log("Livre supprimé avec succès.");
        }
      }
    } catch (err) {
      console.error("Erreur réseau ou serveur : ", err);
    }
  };

  return (
    <div className="Books">
      <Link
        to={"#"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleOpenAddOverlay}
        className="add-icon-container"
      >
        <IoIosAddCircle
          className={`add-icon ${hover ? "hidden" : "visible"}`}
        />
        <IoIosAddCircleOutline
          className={`add-icon ${hover ? "visible" : "hidden"}`}
        />
      </Link>

      <div className="datas">
        <div className="Book-header">
          <p>Nom</p>
          <p>Auteur</p>
          <p>Catégorie</p>
          <p>Date de sortie</p>
          <p>Actions</p>
        </div>
        {books.length > 0 ? (
          books.map((book, index) => (
            <Book
              index={index}
              name={book.name}
              author={book.author}
              category={book.category}
              remove={() => handleDeleteBook(index)}
              edit={() => handleOpenEditOverlay(index)}
              release={book.release}
              buttons={true}
              key={index}
            />
          ))
        ) : (
          <p>Aucun livre trouvé</p>
        )}
      </div>

      {isOverlayOpen && overlayType === "add" && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Ajouter un livre</h2>
            <input
              type="text"
              placeholder="Titre"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Auteur"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Catégorie"
              name="category"
              value={newBook.category}
              onChange={handleInputChange}
            />
            <input
              type="date"
              placeholder="Date de parution"
              name="release"
              value={newBook.release}
              onChange={handleInputChange}
            />
            <div className="overlay-buttons">
              <button onClick={handleAddBook} id="ajouter">
                Ajouter
              </button>
              <button onClick={() => setIsOverlayOpen(false)} id="annuler">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {isOverlayOpen && overlayType === "edit" && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Modifier un livre</h2>
            <input
              type="text"
              placeholder="Titre"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Auteur"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Catégorie"
              name="category"
              value={newBook.category}
              onChange={handleInputChange}
            />
            <input
              type="date"
              placeholder="Date de parution"
              name="release"
              value={newBook.release}
              onChange={handleInputChange}
            />
            <div className="overlay-buttons">
              <button onClick={handleSaveBook} id="sauvegarder">
                Modifier
              </button>
              <button onClick={() => setIsOverlayOpen(false)} id="annuler">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
