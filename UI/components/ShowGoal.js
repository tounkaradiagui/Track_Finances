import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API_URL } from "../config";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ShowGoal = ({ route }) => {
  const { goalId } = route.params;
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingAmount, setSavingAmount] = useState("");
  const navigation = useNavigation();

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("fr-FR", options); // Format français
  };

  const fetchGoal = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL.showGoal}/${goalId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        // console.error("Error response:", errorData);
        Toast.show({
          text1: "Erreur",
          text2:
            errorData.message || "Erreur lors de la récupération de l'objectif",
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }

      const data = await response.json();
      setGoal(data);
    } catch (error) {
      console.log("Fetch goal error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGoal();
    }, [])
  );

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${API_URL.saveForGoal.replace(":id", goalId)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: savingAmount }),
        }
      );

      if (!response.ok) {
        const errorData = response.json();
        Toast.show({
          text1: "Erreur",
          text2: errorData.message,
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }

      const data = response.json();
      Toast.show({
        type: "success",
        text1: "Succès !",
        text2: "Épargne ajoutée avec succès !",
        position: "top",
        visibilityTime: 5000,
      });
      setSavingAmount("");
      navigation.goBack("Goal");
    } catch (error) {
      console.log("Error saving amount:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!goal) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun objectif trouvé !</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.goalCard}>
        <Text style={styles.title}>{goal.name}</Text>
        <Text style={styles.detail}>Épargne actuelle: {goal.currentSaved}</Text>
        <Text style={styles.detail}>Montant ciblé: {goal.targetAmount}</Text>
        <Text style={styles.detail}>Date limite: {formatDate(goal.deadline)}</Text>
        <Text style={styles.detail}>Fréquence d'épargne: {goal.frequency}</Text>
      </View>

      <Text style={styles.savingMessage}>
        Vous souhaitez épargner pour cet objectif ?
      </Text>

      <TextInput
        placeholder="Ajouter une épargne ex: 5000"
        value={savingAmount}
        onChangeText={setSavingAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Ajouter Épargne</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  goalCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  savingMessage: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#078ECB",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
});

export default ShowGoal;
