import React, { createContext, useState } from "react";
import { searchBooks } from "../BooksApi/index";

export const BooksContext = createContext();

export const BooksContextProvide = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksListSearchResults, setBooksListSearchResults] = useState([]);

  // change name
  const [flag, setFlag] = useState(false);

  const changeSearchTermNameHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchBook = async () => {
    setFlag(true);
    if (searchTerm.trim() === "") {
      alert("Please Enter A valid Book Name");
      setFlag(false);
      return;
    }
    try {
      const books = await searchBooks(searchTerm);
      if (books.docs.length) {
        setBooksListSearchResults(books.docs);
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
        searchTerm,
        booksListSearchResults,
        searchBook,
        flag,
        changeSearchTermNameHandler,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
