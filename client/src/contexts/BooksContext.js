import React, { createContext, useState } from "react";
import { searchBooks } from "../BooksApi/index";

export const BooksContext = createContext();

const BooksContextProvide = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [flag, setFlag] = useState(false);

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchBook = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (searchTerm === "") {
      alert("Please Enter A valid Book Name");
      setFlag(false);
      return;
    }
    try {
      const books = await searchBooks(searchTerm);
      setBooksList(books.docs);
      setFlag(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BooksContext.Provider
      value={{
        booksList,
        searchBook,
        flag,
        changeHandler,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvide;
