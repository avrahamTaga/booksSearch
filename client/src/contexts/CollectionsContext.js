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
    let tempCollections = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(tempCollections);
  };

  const addBookToCollection = (array, id, name, year) => {
    array.push({ id, name, year });
    console.log(array);
  };

  return (
    <CollectiosnContext.Provider
      value={{
        collections,
        collectionName,
        changeCollectionNameHandler,
        createCollectionHandler,
        deleteCollectionHandler,
        addBookToCollection,
      }}
    >
      {props.children}
    </CollectiosnContext.Provider>
  );
};

export default CollectiosnContextProvide;
