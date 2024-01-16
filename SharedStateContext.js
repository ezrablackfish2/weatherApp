// SharedStateContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for the shared state
const SharedStateContext = createContext();

// Create a custom hook to access the shared state
export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
};

// Create a provider for the shared state
export const SharedStateProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('Monterey Park');

  return (
    <SharedStateContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </SharedStateContext.Provider>
  );
};

