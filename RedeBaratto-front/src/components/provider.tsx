"use client"
import React, { createContext, useState, useContext } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [sharedValue, setSharedValue] = useState('');

    return (
        <SharedStateContext.Provider value={{ sharedValue, setSharedValue }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => useContext(SharedStateContext);
