import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import Toast from "react-native-toast-message";

const CategoryDetails = ({ route }) => {
  const { categoryId, removeCategory } = route.params;
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${API_URL.showCategory}/${categoryId}`, {
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
      //   console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${API_URL.deleteMyCategory.replace(":id", categoryId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Await here to correctly parse the response
        Toast.show({
          text1: "Erreur",
          text2: errorData.message || "Une erreur est survenue", // Fallback error message
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }

      // Await for the successful response data
      await response.json();
      Toast.show({
        type: "success",
        text1: "Succès !",
        text2: "Épargne supprimée avec succès !",
        position: "top",
        visibilityTime: 5000,
      });

      removeCategory(categoryId);
      
      navigation.goBack("Categories");
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
      "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Confirmer", onPress: handleDelete },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!category) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune categorie trouvée !</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{category.name}</Text>
        <Text style={styles.cardDescription}>
          {category.description || "Aucune description disponible."}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryDetails;

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
    backgroundColor: "#FFFFFF", // Couleur de fond de la carte
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
    color: "#343A40", // Couleur sombre pour le texte
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: "#6C757D", // Couleur grise pour le texte
    lineHeight: 22, // Hauteur de ligne pour un meilleur espacement
  },
});
