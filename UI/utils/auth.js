import AsyncStorage from "@react-native-async-storage/async-storage";

export const isTokenExpired = async () => {
  const expirationTime = await AsyncStorage.getItem("tokenExpiration");
  if (!expirationTime) return true; // Considérer comme expiré si aucune date d'expiration

  const currentTime = new Date().getTime();
  return currentTime > Number(expirationTime);
};