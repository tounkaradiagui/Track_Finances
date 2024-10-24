import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import Toast from "react-native-toast-message";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);

    if(!oldPassword || oldPassword === "") {
        Alert.alert("Error", "Ancien mot de passe est obligatoire");
    }
    else if(!newPassword || newPassword === "") {
        Alert.alert("Error", "Nouveau mot de passe est obligatoire");
    }
    else if(!confirmNewPassword || confirmNewPassword === "") {
        Alert.alert("Error", "Confirmation du nouveau mot de passe est obligatoire");
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
  
      const response = await fetch(API_URL.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmNewPassword,
        }),
      });
  
      // Vérifiez si la réponse est correcte avant de l'analyser
      if (!response.ok) {
        const errorText = await response.text(); // Utilisez .text() pour obtenir le contenu brut
        throw new Error(errorText || "Erreur lors de la modification du mot de passe");
      }
  
      Toast.show({
        type: "success",
        text1: "Profil mis à jour avec succès",
        text2: "votre mot de passe a été changer avec succès !",
        position: "top",
        visibilityTime: 5000,
      });
      setLoading(false);
      // Réinitialiser les champs
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier le mot de passe</Text>
      <TextInput
        placeholder="Ancien mot de passe"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmer le nouveau mot de passe"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleChangePassword}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Chargement..." : "Valider"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#078ECB",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChangePassword;