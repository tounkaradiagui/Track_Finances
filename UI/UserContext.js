import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { isTokenExpired } from "./utils/auth"; 
// import axios from './config/axios'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // L'état utilisateur initialisé à null
  const navigation = useNavigation();

  // Fonction pour vider les données de l'utilisateur
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "authToken",
        "userId",
        "userInfo",
        "tokenExpiration",
      ]);
      setUser(null); // Réinitialisation de l'état utilisateur
      navigation.navigate("PublicScreen", { screen: "Login" }); // Rediriger vers la page de connexion
    } catch (error) {
      console.log("Erreur lors de la déconnexion:", error);
    }
  };

  // Fonction pour vérifier la validité du token et récupérer les informations utilisateur
  const checkTokenValidity = async () => {
    // Cette fonction doit vérifier si le token est expiré
    const expired = await isTokenExpired();
    if (expired) {
      await handleLogout(); // Si le token est expiré, déconnecter l'utilisateur
      return false;
    } else {
      return true;
    }
  };

  // Fonction pour récupérer les informations de l'utilisateur depuis AsyncStorage
  const getUserData = async () => {
    try {
      const isTokenValid = await checkTokenValidity(); // Vérification de la validité du token
      if (!isTokenValid) return;

      const storedToken = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");
      const storedUserInfo = await AsyncStorage.getItem("userInfo");

      // Si toutes les informations sont présentes dans AsyncStorage, on met à jour l'état utilisateur
      if (storedToken && userId && storedUserInfo) {

        // Vérifier côté API que l'utilisateur est toujours actif
        // const response = await axios.get(`/users/${userId}`, {
        //   headers: {
        //     Authorization: `Bearer ${storedToken}`,
        //   },
        // });

        const userData = {
          userId,
          authToken: storedToken,
          userInfo: JSON.parse(storedUserInfo),
        };
        setUser(userData); // Mise à jour de l'état utilisateur
      } else {
        await handleLogout(); // Si des données manquent, on déconnecte l'utilisateur
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Une erreur est survenue lors de la récupération des données.",
        position: "top",
        visibilityTime: 5000,
      });
    }
  };

  // Vérifier la validité du token à chaque démarrage de l'application
  useEffect(() => {
    getUserData(); // Charger les données de l'utilisateur dès que l'application démarre
  }, []);

  // Utiliser `useFocusEffect` pour vérifier la validité du token chaque fois que l'écran est focus
  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
