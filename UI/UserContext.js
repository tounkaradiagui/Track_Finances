import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUserData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                const userId = await AsyncStorage.getItem('userId');
                const storedUserInfo = await AsyncStorage.getItem("userInfo");
    
                if (storedToken && userId && storedUserInfo) {
                    const userData = {
                        userId: userId,
                        authToken: storedToken,
                        userInfo: JSON.parse(storedUserInfo)
                    };
                    setUser(userData);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
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
