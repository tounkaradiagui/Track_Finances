import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const BudgetDetails = ({ route }) => {
  const { budgetId, categories } = route.params;
  const [budget, setBudget] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL.getCategories, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setCategory(data.categories); // Stocker les données dans l'état
      // console.log("Catégories récupérées:", data);
    } catch (error) {
      Toast.show({
        text1: "Erreur",
        text2: error.message,
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        return;
      }
      const response = await fetch(`${API_URL.getBudgetById}/${budgetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      // console.log(data);

      setBudget(data.budget);

      // Trouver la catégorie correspondante
      const foundCategory = categories.find(
        (cat) => cat._id === data.budget.categoryId
      );
      // console.log("Catégorie trouvée :", foundCategory);
      setCategory(foundCategory || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${API_URL.deleteMyBudget.replace(":id", budgetId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Toast.show({
          text1: "Erreur",
          text2: errorData.message || "Une erreur est survenue",
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }

      await response.json();
      Toast.show({
        type: "success",
        text1: "Succès !",
        text2: "Budget supprimé avec succès !",
        position: "top",
        visibilityTime: 5000,
      });
      navigation.goBack("Budget");
    } catch (error) {
      console.log("Error deleting goal:", error);
      Toast.show({
        text1: "Erreur",
        text2: "Une erreur est survenue lors de la suppression",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce budget ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Confirmer", onPress: handleDelete },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await fetchCategories(); // Assurez-vous que les catégories sont chargées
        await fetchBudgets(); // Puis chargez le budget
      };
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!budget) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun budget trouvé !</Text>
      </View>
    );
  }

  // Affichez le contenu une fois que les données sont prêtes
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {category.name || "Aucune catégorie"}
        </Text>
        <Text style={styles.cardText}>Budget {budget.period}</Text>
        <Text style={styles.cardText}>{budget.amount}</Text>
        <Text style={styles.cardDescription}>
          {budget.description || "Aucune description disponible."}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BudgetDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    justifyContent: "center",
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
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: "#6C757D",
    lineHeight: 22,
  },
  cardText: {
    padding:5,
    fontSize: 18,
    color: "#6C757D",
    lineHeight: 22,
  },
});
