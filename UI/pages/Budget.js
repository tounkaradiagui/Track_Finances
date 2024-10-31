import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Budget = () => {
  const [budget, setBudget] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token d'authentification manquant");
      }
      const response = await fetch(API_URL.getBudget, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

      const data = await response.json();
      setBudget(data.budget || []);
    } catch (err) {
      console.log(error);
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
        return;
      }

      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchBudgets();
  //   fetchCategories();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      fetchBudgets();
    }, [])
  );

  const renderBudgetItem = ({ item }) => {
    const category = categories.find((cat) => cat._id === item.categoryId);
    const categoryName = category ? category.name : "Aucune catégorie";
    const amount = Number(item.amount) || 0;

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <FontAwesome name={item.icon || "money"} size={24} color="#fff" />
        </View>
        <View style={styles.details}>
          <Text style={styles.itemName}>{categoryName}</Text>
          <Text style={styles.itemCategory}>
            {amount > 0 ? `${amount} Franc AES` : "0 Franc AES"}
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : budget.length === 0 ? (
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E9B94E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
    color: "#343A40",
  },
  itemCategory: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 4,
  },
  separator: {
    height: 10,
  },
});