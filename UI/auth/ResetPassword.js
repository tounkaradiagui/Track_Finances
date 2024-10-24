import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../config"; // Assurez-vous que cela correspond à votre configuration
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  
  const handleResetPassword = async () => {
      const { token } = route.params; // Récupérer le token passé en paramètre
    if (!newPassword || !confirmPassword) {
      Toast.show({
        text1: "Erreur",
        text2: "Veuillez remplir tous les champs.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        text1: "Erreur",
        text2: "Les mots de passe ne correspondent pas.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL.resetPassword}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword, confirmPassword }),
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
        return;
      }

      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Votre mot de passe a été réinitialisé avec succès.",
        position: "top",
        visibilityTime: 5000,
      });

      navigation.navigate("Login"); // Rediriger vers la page de connexion après succès
    } catch (error) {
      Toast.show({
        text1: "Erreur",
        text2: error.message,
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Réinitialiser votre mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#078ECB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});