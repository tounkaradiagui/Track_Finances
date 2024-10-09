import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Utilisez null au lieu d'une chaîne vide

    useEffect(() => {
        const getUserData = async () => {
            const storedToken = await AsyncStorage.getItem('authToken');
            const userId = await AsyncStorage.getItem('userId');
            if (storedToken && userId) {
                const userData = {
                    userId: userId,
                    authToken: storedToken,
                };
                setUser(userData);
            }
          
            console.log('Token:', storedToken);
            console.log('User ID:', userId);
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