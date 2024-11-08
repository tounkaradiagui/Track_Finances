import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionDetails = ({ route }) => {
  const { transactionId, categories,  removeTransaction } = route.params;

  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    console.log("Fetching categories..."); // Debug log
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
      console.log("Categories fetched:", data); // Debug log
      setCategory(data.categories);
    } catch (error) {
      console.log("Error fetching categories:", error); // Debug log
      Toast.show({
        text1: "Erreur",
        text2: error.message,
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `${API_URL.getTransactionById}/${transactionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        return;
      }
  
      const data = await response.json();
      console.log("Transaction Data:", data);  // Log the full transaction data
  
      setTransaction(data.transaction);
  
      // Find the corresponding category
      const foundCategory = categories.find(
        (cat) => cat._id === data.transaction.categoryId
      );
      console.log("Category Found:", foundCategory);
      setCategory(foundCategory || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("authToken");
  
    // Check if token is null or invalid
    if (!token) {
      Toast.show({
        text1: "Erreur",
        text2: "Token de connexion manquant. Veuillez vous reconnecter.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }
  
    try {
      const response = await fetch(
        `${API_URL.deleteMyTransaction.replace(":id", transactionId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if the response is not okay (status is not 2xx)
      if (!response.ok) {
        const errorText = await response.text();  // Use response.text() to log the actual error content (not JSON)
        console.error("Error response:", errorText);  // Log the error response body for debugging
        
        // Handle the error gracefully
        Toast.show({
          text1: "Erreur",
          text2: errorText || "Une erreur est survenue lors de la suppression.",
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }
  
      // Montrer un message d'alerte après la suppression
      Toast.show({
        type: "success",
        text1: "Succès !",
        text2: "Transaction supprimée avec succès !",
        position: "top",
        visibilityTime: 5000,
      });

      removeTransaction(transactionId);
  
      // Go back to the previous screen
      navigation.goBack("Transaction");  
  
    } catch (error) {
      // Catch any unexpected errors (network issues, etc.)
      console.error("Error during transaction deletion:", error);
      Toast.show({
        text1: "Erreur",
        text2: "Une erreur est survenue lors de la suppression.",
        type: "error",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };
  

  const confirmDelete = () => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette transaction ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Confirmer", onPress: handleDelete },
      ]
    );
  };

useFocusEffect(
    useCallback(() => {
        fetchCategories();
        fetchTransactions();  // Fetch transaction list after returning to this page
    }, [])
);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune transaction disponible !</Text>
      </View>
    );
  }

  const formattedDate = new Date(transaction.createdAt).toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.transactionsCard}>
        <Text style={styles.title}>{transaction.type}</Text>
        <Text style={styles.detail}>Montant: {transaction.amount}</Text>
        <Text style={styles.title}>
          {category ? category.name : "Aucune catégorie"}
        </Text>
        <Text style={styles.detail}>Date: {formattedDate}</Text>
        <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  transactionsCard: {
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
  deleteButton: {
    backgroundColor: "#ff0000",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
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
