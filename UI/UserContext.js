import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { isTokenExpired } from "./utils/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "authToken",
        "userId",
        "userInfo",
        "tokenExpiration",
      ]);
      setUser(null);
      navigation.navigate("PublicScreen", { screen: "Login" });
      Toast.show({
        type: "error",
        text1: "Désolé !!",
        text2: "Votre session a expirée, veuillez vous reconnecter !",
        position: "top",
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const getUserData = async () => {
    try {
      const isTokenValid = await checkTokenExpiration();
      if (!isTokenValid) return;

      const storedToken = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");
      const storedUserInfo = await AsyncStorage.getItem("userInfo");

      if (storedToken && userId && storedUserInfo) {
        const userData = {
          userId: userId,
          authToken: storedToken,
          userInfo: JSON.parse(storedUserInfo),
        };
        setUser(userData);
      } else {
        // console.log("Données utilisateur incomplete:", { storedToken, userId, storedUserInfo });
        await handleLogout();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
      );
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Une erreur est survenue lors de la récupération des données.",
        position: "top",
        visibilityTime: 5000,
      });
    }
  };

  const checkTokenValidity = async () => {
    const expired = await isTokenExpired();
    if (expired) {
      await handleLogout();
      console.log("Le token a expiré");
    } else {
      await getUserData();
      console.log("Le token est toujours valide");
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkTokenValidity();
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
