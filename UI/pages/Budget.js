import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Budget = () => {
  const [budget, setBudget] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const fetchBudgets = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      // console.log("Token récupéré:", token); // Ajoutez ce log

      if (!token) {
        throw new Error("Token d'authentification manquant");
      }
      // const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(API_URL.getBudget, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          response.statusText || "Erreur lors de la récupération des budgets"
        );
      }

      // Trier les budgets par montant de façon décroissante
      // const sortedBudgets = data.budget ? data.budget.sort((a, b) => b.amount - a.amount) : [];
      // setBudget(sortedBudgets);

      const data = await response.json();
      // console.log("Budgets récupérés:", data.budget); // Log pour débogage
      setBudget(data.budget || []); // Adaptez selon votre structure de données
    } catch (err) {
      console.error("Erreur lors de la récupération des budgets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        throw new Error("Erreur lors de la récupération des catégories");
      }

      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des catégories:", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  const renderBudgetItem = ({ item }) => {
    // console.log("Item budget:", item); // Vérifiez les données de l'item

    // Cherchez la catégorie correspondante
    const category = categories.find((cat) => cat._id === item.categoryId);
    const categoryName = category ? category.name : "Aucune catégorie";

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <FontAwesome name={item.icon || "money"} size={24} color="#fff" />
        </View>
        <View style={styles.details}>
          <Text style={styles.itemName}>{categoryName}</Text>
          <Text style={styles.itemCategory}>
            {item.amount
              ? `${item.amount} Franc AES`
              : "Montant non disponible"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste de Budgets</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddBudget")}>
          <AntDesign name="plussquare" size={30} color="#E9B94E" />
        </TouchableOpacity>
      </View>
      {budget.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun budget disponible</Text>
        </View>
      ) : (
        <FlatList
          data={budget}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#3f669d",
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: "#fff",
  },
  itemAmount: {
    fontSize: 16,
    color: "#fff",
  },
  separator: {
    height: 10,
  },
  itemCategory: {
    fontSize: 14,
    color: "#E9B94E", // Une couleur qui se démarque
    fontWeight: "600", // Poids de police légèrement plus épais
    marginTop: 4, // Un peu d'espace au-dessus
    marginBottom: 4, // Un peu d'espace en-dessous
    textTransform: "capitalize", // Met en majuscule la première lettre de chaque mot
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1, // Pour Android
  },
});
