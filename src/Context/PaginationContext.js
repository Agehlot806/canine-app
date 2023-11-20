// PaginationContext.js
import React, { createContext, useContext, useState } from 'react';
const PaginationContext = createContext();
export function usePagination() {
  return useContext(PaginationContext);
}
export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(1);
  const [currentPage7, setCurrentPage7] = useState(1);
  const [currentPage8, setCurrentPage8] = useState(1);
  const [currentPage9, setCurrentPage9] = useState(1);
  const value = {
    currentPage,
    setCurrentPage,
    currentPage1,
    setCurrentPage1,
    currentPage2,
    setCurrentPage2,
    currentPage3,
    setCurrentPage3,
    currentPage4,
    setCurrentPage4,
    currentPage5,
    setCurrentPage5,
    currentPage6,
    setCurrentPage6,
    currentPage7,
    setCurrentPage7,
    currentPage8,
    setCurrentPage8,
    currentPage9,
    setCurrentPage9,
  };
  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}
