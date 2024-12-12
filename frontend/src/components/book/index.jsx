import React from "react";
import "./book.css";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

function Book({ name, author, category, release, buttons, edit, remove }) {
  if (!buttons) {
    return (
      <div className="Book">
        <p>{name}</p>
        <p>{author}</p>
        <p>{category}</p>
        <p>{release.split("-").reverse().join("/")}</p>
      </div>
    );
  } else {
    return (
      <div className="Book" id="withButtons">
        <p>{name}</p>
        <p>{author}</p>
        <p>{category}</p>
        <p>{release.split("-").reverse().join("/")}</p>
        <div id="buttons">
          <button id="edit" onClick={edit}>
            <FaEdit />
          </button>
          <button id="delete" onClick={remove}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    );
  }
}

export default Book;
