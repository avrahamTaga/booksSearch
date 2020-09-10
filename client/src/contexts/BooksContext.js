import React, { createContext, useState } from "react";
import { searchBooks } from "../BooksApi/index";

export const BooksContext = createContext();

const BooksContextProvide = (props) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [flag, setFlag] = useState(false);

  const changeSearchTermNameHandler = (e) => {
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
      if (books.docs.length) {
        setBooksList(books.docs);
        setFlag(false);
      } else {
        setFlag(false);
        return alert("Not Search Result");
      }
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
        changeSearchTermNameHandler,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvide;
