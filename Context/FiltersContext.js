import React, { createContext, useState, useCallback } from 'react';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [isBuy, setIsBuy] = useState(true);
  const [isSort, setIsSort] = useState(false);
  const [isAscendingPrice, setIsAscendingPrice] = useState(false);
  const [isDescendingPrice, setIsDescendingPrice] = useState(false);
  const [isNewListning, setIsNewListning] = useState(false);
  const [condition, setCondition] = useState('');

  const sortTitle = useCallback(() => {
    if (isAscendingPrice) {
      return 'Low to High';
    } else if (isDescendingPrice) {
      return 'High to Low';
    } else if (isNewListning) {
      return 'New';
    } else {
      return '';
    }
  }, [isAscendingPrice, isDescendingPrice, isNewListning]);

  const setFilter = useCallback((value, sortValue = '', condition = '') => {
    if (value === 'Condition') {
      setCondition(condition);
      return;
    }
    if (value === 'Buy') {
      setIsBuy(true);
    } else if (value === 'Rent') {
      setIsBuy(false);
    } else if (value === 'Sort') {
      setSort(sortValue);
    }
  }, [setSort]);

  const setSort = useCallback((value) => {
    setIsSort(true);
    if (value === 'New') {
      setIsAscendingPrice(false);
      setIsDescendingPrice(false);
      setIsNewListning(true);
    } else if (value === 'LowToHigh') {
      setIsDescendingPrice(false);
      setIsNewListning(false);
      setIsAscendingPrice(true);
    } else if (value === 'HighToLow') {
      setIsNewListning(false);
      setIsAscendingPrice(false);
      setIsDescendingPrice(true);
    }
  }, []);

  const removeSort = useCallback(() => {
    setIsSort(false);
    setIsNewListning(false);
    setIsAscendingPrice(false);
    setIsDescendingPrice(false);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        isBuy,
        setIsBuy,
        setSort,
        removeSort,
        setFilter,
        sortTitle,
        isSort,
        condition,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}