import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "./../config/index";

import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const Register = () => {
  const [isSelected, setSelection] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckedboxChange = () => {
    setSelection(!isSelected);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigation = useNavigation();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Regex pour valider l'email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Le mot de passe doit avoir au moins 4 caractères
  const isValidPassword = (password) => {
    return password.length >= 4;
  };

  const handleRegister = async () => {
    setLoading(true);

    const state = await NetInfo.fetch();
    // Vérifier la connexion de l'utilisateur
    if (!state.isConnected) {
      Toast.show({
        text1: "Erreur de connexion",
        text2: "Veuillez vérifier votre connexion Internet.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    // Validation du nom
    if (!nom) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez saisir votre nom.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    // Validation du prenom
    if (!prenom) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez saisir votre prenom.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    // Validation du email
    if (!email) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez saisir votre adresse email.",
        type: "error",
        position: "top",
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
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    // Validation du mot de passe
    if (!password) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez entrer votre votre mot de passe.",
        type: "error",
        position: "top",
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
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    if (!confirmPassword) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez confirmer votre mot de passe.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        text1: "Erreur",
        text2: "Les mots de passe ne correspondent pas.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const response = await fetch(API_URL.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Toast.show({
          text1: "Erreur",
          text2: errorData.message,
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(data);
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate("Login");
      Alert.alert("Inscription réussie", "Bienvenue !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            marginTop: 40,
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              marginLeft: 25,
              marginBottom: 30,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Création de votre compte
            </Text>
          </View>

          <View
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
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
                name="person"
                size={24}
                color="black"
              />
              <TextInput
                require={true}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
                style={{
                  width: 250,
                  borderColor: "#078ECB",
                  marginBottom: "auto",
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
              marginBottom: 20,
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
                name="person"
                size={24}
                color="black"
              />
              <TextInput
                require={true}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
                style={{
                  width: 250,
                  borderColor: "#078ECB",
                  marginBottom: "auto",
                  color: "black",
                  width: "100%",
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

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
                placeholder="Adresse Email"
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
                // padding: 20
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderWidth: 2,
                borderColor: "#078ECB",
                paddingVertical: 10,
                borderRadius: 5,
                // padding: 20
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 5 }}
                name="lock"
                size={24}
                color="black"
              />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={{ width: 250 }}
                placeholder="Confirmer le Mot de passe"
              />

              <MaterialCommunityIcons
                onPress={toggleConfirmPasswordVisibility}
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="black"
                marginRight={5}
              />
            </View>
          </View>

          <View>
            {/* <CheckBox
              title="J'accepte les termes et Conditons"
              checked={isSelected}
              onPress={handleCheckedboxChange}
              checkedIcon="dot-circle-o"
            /> */}
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
                onPress={handleRegister}
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
                  S'inscrire
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Déjà inscrit ? Se Connecter
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
