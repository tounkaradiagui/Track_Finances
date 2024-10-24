import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../config";
import { useUser } from "../UserContext";

import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const Login = () => {
  // const APP_URL = process.env.APP_URL;
  // PORT = process.env.PORT;
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 4; // Exemple : mot de passe doit avoir au moins 4 caractères
  };

  const handleLogin = async () => {
    const currentDate = new Date();
    setLoading(true);

    // Vérifier la connexion Internet
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Toast.show({
        text1: "Erreur de connexion",
        text2: "Veuillez vérifier votre connexion Internet.",
        type: "error",
        position: 'top',
        visibilityTime: 3000, // Durée d'affichage en millisecondes
      });
      setLoading(false);
      return;
    }

    // Vérifier si les champs sont remplis
    if(!email) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez entrer votre email.",
        type: "error",
        position: 'top',
        visibilityTime: 3000, 
      });

      setLoading(false);
      return;
    }

    // Validation de l'email
    if (!isValidEmail(email)) {
      Toast.show({
          text1: "Erreur",
          text2: "Veuillez entrer un email valide.",
          type: "error",
          position: 'top',
          visibilityTime: 3000, 
      });
      setLoading(false);
      return;
    }

    if (!password) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez entrer votre votre mot de passe.",
        type: "error",
        position: 'top',
        visibilityTime: 3000, 
      });
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      Toast.show({
          text1: "Erreur",
          text2: "Le mot de passe doit contenir au moins 4 caractères.",
          type: "error",
          position: 'top',
          visibilityTime: 3000, 
      });
      setLoading(false);
      return;
    }

    try {
        const userData = {
            email,
            password,
            lastLogin: currentDate,
        };

        const response = await fetch(API_URL.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        // Vérifier si la réponse est correcte
        if (!response.ok) {
            const errorData = await response.json();
            Toast.show({
              text1: "Erreur",
              text2: errorData.message,
              type: "error",
              position: 'top',
              visibilityTime: 3000, 
          });
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Données de l’utilisateur:", data);
        setLoading(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Stocker le token
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem("userId", data.user._id);
        console.log("ID utilisateur stocké :", data.user._id);
        
        // Stocker les informations utilisateur
        const userInfos = {
            userId: data.user._id,
            nom: data.user.nom,
            prenom: data.user.prenom,
            email: data.user.email,
            lastLogin: currentDate,
        };
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfos));
        setUser(userInfos);
        console.log(userInfos);

        // Naviguer vers l'écran principal
        navigation.navigate("ProtectedData");
        Toast.show({
          type: "success",
          text1: "Féliciations !!",
          text2: `Vous êtes connecté en tant que ${data.user.prenom} ${data.user.nom}`,
          position: "top",
          visibilityTime: 5000,
        });
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#078ECB"} style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../assets/images/myOfficialLogo.png")}
          resizeMode="contain"
          style={{
            width: "100%",
            height: 200,
            marginTop: 50,
          }}
        />

        <KeyboardAvoidingView>
          <View style={{ alignItems: "flex-start", marginLeft: 25 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              Welcome Back !
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 10 }}>
            <View
              style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 2,
                  borderColor: "#078ECB",
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 5 }}
                  name="email"
                  size={24}
                  color="black"
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Adresse email"
                  style={{
                    borderColor: "#078ECB",
                    color: "black",
                    width: "100%",
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  borderWidth: 2,
                  borderColor: "#078ECB",
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 5 }}
                  name="lock"
                  size={24}
                  color="black"
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={{ width: 250 }}
                  placeholder="Mot de passe"
                />

                <MaterialCommunityIcons
                  onPress={togglePasswordVisibility}
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                  marginRight={5}
                />
              </View>
            </View>

            <View
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 20,
              }}
            >
              {loading ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E9B94E",
                    borderRadius: 10,
                    padding: 5,
                    borderColor: "#078ECB",
                    width: "100%",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text
                    style={{
                      borderColor: "#078ECB",
                      padding: 10,
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Chargement...
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#078ECB",
                    borderRadius: 10,
                    padding: 5,
                    borderColor: "#078ECB",
                    width: "100%",
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text
                    style={{
                      borderColor: "#078ECB",
                      padding: 10,
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Connexion
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={{ padding: 25, alignItems: "center", paddingTop: 10 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Mot de Passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 25, alignItems: "center", paddingTop: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Pas encore inscrit ? Cliquez Ici pour s'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
