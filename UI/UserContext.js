import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { isTokenExpired } from "./utils/auth"; // Assurez-vous que cette fonction est définie et fonctionne correctement

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Définir la fonction handleLogout ici pour qu'elle soit accessible
  const handleLogout = async () => {
    try {
      // Suppression des données dans AsyncStorage
      await AsyncStorage.multiRemove([
        "authToken",
        "userId",
        "userInfo",
        "tokenExpiration",
      ]);
      setUser(null); // Mettre l'état de l'utilisateur à null
      // Redirection vers l'écran de connexion
      navigation.navigate("PublicScreen", { screen: "Login" });
      // Affichage du message toast
      // Toast.show({
      //   type: "error",
      //   text1: "Désolé !!",
      //   text2: "Votre session a expirée, veuillez vous reconnecter !",
      //   position: "top",
      //   visibilityTime: 5000,
      // });
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  // Fonction pour récupérer les données utilisateur
  const getUserData = async () => {
    try {
      const isTokenValid = await checkTokenValidity(); // Vérifier la validité du token
      if (!isTokenValid) return;

      const storedToken = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");
      const storedUserInfo = await AsyncStorage.getItem("userInfo");

      // Vérification des données utilisateur dans AsyncStorage
      if (storedToken && userId && storedUserInfo) {
        const userData = {
          userId: userId,
          authToken: storedToken,
          userInfo: JSON.parse(storedUserInfo),
        };
        setUser(userData); // Mise à jour de l'état de l'utilisateur
      } else {
        // Si les données sont incomplètes, on appelle handleLogout
        await handleLogout();
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Une erreur est survenue lors de la récupération des données.",
        position: "top",
        visibilityTime: 5000,
      });
    }
  };

  // Fonction pour vérifier la validité du token
  const checkTokenValidity = async () => {
    const expired = await isTokenExpired(); // Vérifier si le token est expiré
    if (expired) {
      await handleLogout(); // Appeler handleLogout en cas d'expiration
      console.log("Le token a expiré");
      return false;
    } else {
      await getUserData(); // Si le token est valide, récupérer les données utilisateur
      // console.log("Le token est toujours valide");
      return true;
    }
  };

  // Utilisation de useFocusEffect pour vérifier le token à chaque focus de l'écran
  useFocusEffect(
    useCallback(() => {
      checkTokenValidity(); // Vérification de la validité du token à chaque fois que l'écran est focus
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
