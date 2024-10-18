import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
<<<<<<< HEAD

const EditProfile = () => {
=======
import { useUser } from "../UserContext";

const EditProfile = () => {
  const { user, setUser } = useUser();
  if (!user) {
    return <Text>Chargement...</Text>; // Affichez un message de chargement
  }

>>>>>>> master
  const navigation = useNavigation();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  // Fonction pour enregistrer les modifications
  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");
<<<<<<< HEAD
=======

    if (!prenom || !nom || !email) {
      Toast.show({
        type: "error",
        text1: "Erreur de validation",
        text2: "Tous les champs doivent être remplis.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

>>>>>>> master
    const userData = {
      id: userId,
      prenom: prenom,
      nom: nom,
      email: email,
    };
<<<<<<< HEAD
    if (userId) {
      try {
        const response = await fetch(API_URL.editUserProfile, {
=======

    console.log("Données utilisateur à mettre à jour :", userData);

    if (userId) {
      try {
        const response = await fetch(`${API_URL.editUserProfile}/${userId}`, {
>>>>>>> master
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
<<<<<<< HEAD
=======

        // const responseText = await response.text(); // Récupère la réponse sous forme de texte
        // console.log("Réponse de l'API :", responseText); // Affiche la réponse
        
        // Essayez de parser la réponse JSON
        const data = await response.json();
        console.log(data);

>>>>>>> master
        if (!response.ok) {
          Toast.show({
            type: "error",
            text1: "Erreur",
            text2: "Veuillez réessayer plus tard",
            position: "top",
            visibilityTime: 3000,
          });
<<<<<<< HEAD
        }

        const data = await response.json();
        console.log(data);
=======
          return;
        }

        // Mettez à jour le contexte avec les nouvelles informations de l'utilisateur
        setUser((prev) => ({
          ...prev,
          prenom: data.user.prenom,
          nom: data.user.nom,
          email: data.user.email,
        }));
>>>>>>> master

        Toast.show({
          type: "success",
          text1: "Profil mis à jour avec succès",
          text2:
            "Vous pouvez maintenant vous connecter avec vos nouvelles informations",
          position: "top",
          visibilityTime: 5000,
        });
        console.log("Données mises à jour avec succès");
<<<<<<< HEAD
        navigation.navigate("Profile");
=======
        navigation.navigate("BottomTabs");
>>>>>>> master
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
        Toast.show({
          text1: "Erreur",
          text2: "Échec de la mise à jour. Veuillez réessayer.",
          type: "error",
        });
      }
    }
  };

  const loadUserData = async () => {
<<<<<<< HEAD
    // Vérifie la connexion Internet
=======
>>>>>>> master
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.error("Pas de connexion Internet");
      return;
    }

    const userId = await AsyncStorage.getItem("userId");
<<<<<<< HEAD
    console.log("ID utilisateur récupéré :", userId);

    if (userId) {
      try {
        const response = await fetch(API_URL.editUserProfile, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
=======
    if (userId) {
      try {
        const response = await fetch(`${API_URL.editUserProfile}/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
>>>>>>> master
        });
        if (!response.ok) {
          return;
        }
        const userData = await response.json();
        setPrenom(userData.prenom || "");
        setNom(userData.nom || "");
        setEmail(userData.email || "");
      } catch (error) {
<<<<<<< HEAD
        console.error(
          "Erreur lors de la récupération des données :",
          error.message
        );
=======
>>>>>>> master
        Toast.show({
          text1: "Erreur",
          text2:
            error.message ||
            "Échec de la récupération des données. Veuillez réessayer.",
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
      }
    }
  };

  useEffect(() => {
    loadUserData();
<<<<<<< HEAD
  }, [])
=======
  }, []);
>>>>>>> master

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Modifier le Profil</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#078ECB",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;
