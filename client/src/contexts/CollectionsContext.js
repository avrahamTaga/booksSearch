import React, { createContext, useState } from "react";

export const CollectiosnContext = createContext();

const CollectiosnContextProvide = (props) => {
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  const changeCollectionNameHandler = (e) => {
    setCollectionName(e.target.value);
  };

  const createCollectionHandler = (collectionName, id) => {
    if (collectionName === "") {
      alert("Please Enter A valid Collection Name");
      return;
    }
    const newCollection = {
      collectionName,
      books: [],
      id,
    };
    setCollections([...collections, newCollection]);
  };

  const deleteCollectionHandler = (id) => {
    const tempCollections = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(tempCollections);
  };

  const addBookToCollectionHandler = (array, id, name, year, img) => {
    array.push({ id, name, year, img });
  };

  const deleteBookFromCollectionHandker = (name, id) => {
    const tempCollections = [...collections];
    const collectionsIndex = tempCollections.findIndex(
      (item) => item.collectionName === name
    );
    const newCollections = { ...tempCollections[collectionsIndex] };
    const tempBooks = [...newCollections.books];
    const newBooks = tempBooks.filter((element) => element.id !== id);
    newCollections.books = newBooks;
    tempCollections[collectionsIndex] = newCollections;
    setCollections(tempCollections);
  };

  return (
    <CollectiosnContext.Provider
      value={{
        collections,
        collectionName,
        changeCollectionNameHandler,
        createCollectionHandler,
        deleteCollectionHandler,
        addBookToCollectionHandler,
        deleteBookFromCollectionHandker,
      }}
    >
      {props.children}
    </CollectiosnContext.Provider>
  );
};

export default CollectiosnContextProvide;
