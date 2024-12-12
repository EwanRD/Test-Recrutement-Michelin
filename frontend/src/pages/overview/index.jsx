import React, { useEffect, useState } from "react";
import "../../assets/css/root.css";
import "./overview.css";
import Book from "../../components/book";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Overview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [booksTemp, setBooksTemp] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState("none");
  const [currentCategory, setCurrentCategory] = useState("none");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/loadBooks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: searchQuery || "" }),
        });

        const data = await response.json();

        if (data.success) {
          console.log("success");
          setBooks(data.bookList);
          setBooksTemp(data.bookList);

          let tempAuthors = [];
          let tempCategories = [];
          data.bookList.forEach((book) => {
            tempAuthors = [...tempAuthors, book.author];
            tempCategories = [...tempCategories, book.category];
          });
          setAuthors([...new Set(tempAuthors)]);
          setCategories([...new Set(tempCategories)]);

          // Calcul des données pour le graphique
          const categoryCounts = data.bookList.reduce((acc, book) => {
            acc[book.category] = (acc[book.category] || 0) + 1;
            return acc;
          }, {});

          setChartData({
            labels: Object.keys(categoryCounts),
            datasets: [
              {
                label: "Nombre de livres",
                data: Object.values(categoryCounts),
                backgroundColor: "#C7BEFF",
                borderColor: "#0A121D",
                borderWidth: 1,
              },
            ],
          });
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
  }, [searchQuery]);

  const applyFilters = (author, category, searchQuery) => {
    let filteredBooks = books;

    if (author !== "none") {
      filteredBooks = filteredBooks.filter((book) => book.author === author);
    }

    if (category !== "none") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === category
      );
    }

    if (searchQuery) {
      const lowerCaseSearch = searchQuery.toLowerCase();
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.name.toLowerCase().includes(lowerCaseSearch) ||
          book.author.toLowerCase().includes(lowerCaseSearch) ||
          book.category.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setBooksTemp(filteredBooks);
  };

  const handleChangeAuthor = (author) => {
    applyFilters(author, currentCategory, searchQuery);
    setCurrentAuthor(author);
  };

  const handleChangeCategory = (category) => {
    applyFilters(currentAuthor, category, searchQuery);
    setCurrentCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    applyFilters(currentAuthor, currentCategory, query);
  };

  return (
    <div className="Overview">
      <section id="visData">
        <div id="left">
          <input
            type="search"
            placeholder="Rechercher..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <div className="datas">
            <div className="Book-header">
              <p>Nom</p>
              <p>Auteur</p>
              <p>Catégorie</p>
              <p>Date de sortie</p>
            </div>
            {booksTemp.length > 0 ? (
              booksTemp.map((book, index) => (
                <Book
                  name={book.name}
                  author={book.author}
                  category={book.category}
                  release={book.release}
                  buttons={false}
                  key={index}
                />
              ))
            ) : (
              <p>Aucun livre trouvé</p>
            )}
          </div>
        </div>
        <div id="filters">
          <h2>Filtres</h2>
          <select
            name="author"
            id="author"
            onChange={(e) => handleChangeAuthor(e.target.value)}
          >
            <option value="none">Choisir un auteur</option>
            {authors.map((author, index) => (
              <option value={author} key={index}>
                {author}
              </option>
            ))}
          </select>
          <select
            name="category"
            id="category"
            onChange={(e) => handleChangeCategory(e.target.value)}
          >
            <option value="none">Choisir une catégorie</option>
            {categories.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section id="graphique">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Nombre de livres par catégorie",
                },
              },
            }}
          />
        ) : (
          <p>Chargement du graphique...</p>
        )}
      </section>
    </div>
  );
}

export default Overview;
