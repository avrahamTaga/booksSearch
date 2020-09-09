import React, { createContext, useState } from "react";

export const CollectiosnContext = createContext();

const CollectiosnContextProvide = (props) => {
  const [collections, setCollections] = useState([{ toRead: [] }]);
  const [collectionName, setCollectionName] = useState("");
  const tempCollections = [...collections];

  const addBooksToExistingCollection = (array, id, name, year, img) => {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.id === id) {
          console.log("Feild");
        return;
      }
    }
    tempCollections[0].toRead.push({
      id,
      name,
      year,
      img,
    });
    setCollections(tempCollections);
    console.log(tempCollections[0].toRead);
  };

  return (
    <CollectiosnContext.Provider
      value={{ collections, addBooksToExistingCollection }}
    >
      {props.children}
    </CollectiosnContext.Provider>
  );
};

export default CollectiosnContextProvide;
