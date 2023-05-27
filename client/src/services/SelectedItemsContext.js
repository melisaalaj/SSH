// SelectedItemsContext.js
import React, { createContext, useState } from 'react';

export const SelectedItemsContext = createContext();

export const SelectedItemsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addToSelectedItems = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const removeFromSelectedItems = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  return (
    <SelectedItemsContext.Provider
      value={{ selectedItems, setSelectedItems, addToSelectedItems, removeFromSelectedItems }} >
      {children}
    </SelectedItemsContext.Provider>
  );
};
