import React from "react";
import "../../assets/css/root.css";
import "./nav.css";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiBook2Fill } from "react-icons/ri";

function Nav() {
  const location = useLocation();

  const pages = [
    {
      name: "Overview",
      link: "/",
      icon: <FaHome />,
    },
    {
      name: "Gérer les livres",
      link: "/books",
      icon: <RiBook2Fill />,
    },
  ];

  return (
    <div className="Nav">
      <h1>Bibliothèque</h1>
      <div>
        {pages.map((page, index) => (
          <Link
            to={page.link}
            className={location.pathname === page.link ? "active" : ""}
            key={index}
          >
            {page.icon} {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Nav;
