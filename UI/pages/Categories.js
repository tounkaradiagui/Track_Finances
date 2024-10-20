import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { COLORS } from "../constants";

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    } catch (error) {
      console.log("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const handleViewDetails = (categoryId) => {
    navigation.navigate("CategoryDetails", { categoryId });
  };

  const renderCategoryItem = (category) => {
    const formattedDate = new Date(category.createdAt).toLocaleDateString();

    return (
      <View key={category._id} style={styles.categoryCard}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryDate}>{formattedDate}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleViewDetails(category._id)}>
          <Text style={styles.buttonText}>Consulter</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste des Catégories</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddCategory")}>
          <AntDesign name="plussquare" size={30} color={"#E9B94E"} />
        </TouchableOpacity>
      </View>
      {categories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucune catégorie disponible</Text>
        </View>
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {categories.map(renderCategoryItem)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryName: {
    fontSize: 18,
    color: "#343A40",
  },
  categoryDate: {
    fontSize: 14,
    color: "#6C757D",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#E9B94E", // Utiliser la couleur primaire pour le bouton
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
