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
import { useUser } from "../UserContext";

const EditProfile = () => {
  const { user, setUser } = useUser();
  if (!user) {
    return <Text>Chargement...</Text>; // Affichez un message de chargement
  }

  const navigation = useNavigation();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  // Fonction pour enregistrer les modifications
  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");

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
    const userData = {
      id: userId,
      prenom: prenom,
      nom: nom,
      email: email,
    };

    if (userId) {
      try {
        const response = await fetch(`${API_URL.editUserProfile}/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          // console.error("Erreur lors de la mise à jour :", errorData);
          Toast.show({
            type: "error",
            text1: "Erreur",
            text2: errorData.message || "Veuillez réessayer plus tard",
            position: "top",
            visibilityTime: 3000,
          });
          return;
        }

        const updatedUserData = await response.json();
        // console.log("Données mises à jour :", updatedUserData);

        // Mettez à jour le contexte et les états locaux
        setUser((prev) => ({
          ...prev,
          prenom: updatedUserData.user.prenom || prev.prenom,
          nom: updatedUserData.user.nom || prev.nom,
          email: updatedUserData.user.email || prev.email,
        }));

        // Mettre à jour les états locaux
        setPrenom(updatedUserData.user.prenom || "");
        setNom(updatedUserData.user.nom || "");
        setEmail(updatedUserData.user.email || "");

        Toast.show({
          type: "success",
          text1: "Profil mis à jour avec succès",
          text2:"Vous pouvez maintenant vous connecter avec vos nouvelles infos",
          position: "top",
          visibilityTime: 5000,
        });

        await loadUserData(); // Assurez-vous que cela appelle la bonne URL
        navigation.navigate("Profile");
      } catch (error) {
        // console.error("Erreur lors de la mise à jour des données :", error);
        Toast.show({
          text1: "Erreur",
          text2: "Échec de la mise à jour. Veuillez réessayer.",
          type: "error",
        });
      }
    }
  };

  const loadUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("ID utilisateur introuvable.");
      }

      const url = `${API_URL.editUserProfile}/${userId}`;
      // URL de la requête
      // console.log("Requête vers l'URL :", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text();

      if (!response.ok) {
        return;
      }

      const userData = JSON.parse(responseText); // Parsez la réponse en JSON
      setPrenom(userData.prenom || "");
      setNom(userData.nom || "");
      setEmail(userData.email || "");
    } catch (error) {
      Toast.show({
        text1: "Erreur",
        text2: "Échec de la récupération des données. Veuillez réessayer.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setPrenom(user.prenom);
      setNom(user.nom);
      setEmail(user.email);
    } else {
      // Charge les données si l'utilisateur n'est pas déjà présent
      loadUserData();
    }
  }, [user]);

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
