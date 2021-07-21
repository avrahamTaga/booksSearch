import React, { createContext, useState } from "react";

export const CollectiosnContext = createContext();

export const CollectiosnContextProvide = (props) => {
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");

  const changeCollectionNameHandler = (e) => {
    setCollectionName(e.target.value);
  };

  const changeCollectionNewNamaHandler = (e) => {
    setNewCollectionName(e.target.value);
  };

  const createCollectionHandler = (collectionName, id) => {
    if (collectionName.trim() === "") {
      alert("Please Enter A valid Collection Name");
      return;
    }
    const findIfCollectionExistAlredy = collections.findIndex(
      (collection) => collection.collectionName === collectionName
    );
    if (findIfCollectionExistAlredy === -1) {
      const newCollection = {
        collectionName,
        books: [],
        id,
      };
      setCollections([...collections, newCollection]);
    } else {
      alert("This Collection Alredy Exist, Please Choose Another Name");
    }
  };

  const deleteCollectionHandler = (id) => {
    const tempCollections = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(tempCollections);
  };

  // ***
  const addBookToCollectionHandler = (books, id, name, year, img) => {
    books.push({ id, name, year, img });
  };

  const deleteBookFromCollectionHandler = (name, id) => {
    const tempCollections = [...collections];
    const collectionsIndex = tempCollections.findIndex(
      (collection) => collection.collectionName === name
    );
    const newCollection = { ...tempCollections[collectionsIndex] };
    const tempBooks = [...newCollection.books];
    const filterBooks = tempBooks.filter((element) => element.id !== id);
    newCollection.books = filterBooks;
    tempCollections[collectionsIndex] = newCollection;
    setCollections(tempCollections);
  };

  const renameCollectionNameHandler = (name, newCollectionName) => {
    const tempCollections = [...collections];
    const collectionsIndex = tempCollections.findIndex(
      (collection) => collection.collectionName === name
    );
    const newCollections = { ...tempCollections[collectionsIndex] };
    newCollections.collectionName = newCollectionName;
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
        deleteBookFromCollectionHandler,
        renameCollectionNameHandler,
        changeCollectionNewNamaHandler,
        newCollectionName,
      }}
    >
      {props.children}
    </CollectiosnContext.Provider>
  );
};
