import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            const storedToken = await AsyncStorage.getItem('authToken');
            if (storedToken) {
                // Décoder le token ou utiliser une fonction pour récupérer l'utilisateur
                const userData = JSON.parse(storedToken);
                setUser(userData); // Assurez-vous que le format est correct
            }
        };
        getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};