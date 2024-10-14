import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { API_URL } from "../config";

const AddTransaction = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL.createTransaction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: type,
          amount: amount,
          categoryId: categoryId,
          budgetId: budgetId,
          description: description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la création de la catégorie"
        );
      }

      setType("");
      setAmount("");
      setCategoryId("");
      setBudgetId("");
      setDescription("");
      navigation.navigate("Transaction");
      Alert.alert("Succès", "Transaction ajoutée avec succès !");
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", error.message);
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
        throw new Error(
          response.statusText || "Erreur lors de la récupération des catégories"
        );
      }

      const data = await response.json();
      setCategories(data.categories); // Stocker les données dans l'état
      // console.log("Catégories récupérées:", data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const fetchBudgets = async () => {
    try {
      await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL.getBudget, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          response.statusText || "Erreur lors de la récupération des budgets"
        );
      }
      const data = await response.json();

      setBudgets(data.budget || []);
      // console.log("Budgets récupérés:", data);
    } catch (err) {
      console.error("Erreur lors de la récupération des budgets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Ajouter une Transaction
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Dépense" value="depense" />
          <Picker.Item label="Revenu" value="revenu" />
        </Picker>
      </View>
      <TextInput
        placeholder="Montant"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
        }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
          height: 100,
        }}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Picker
          selectedValue={budgetId}
          onValueChange={(itemValue) => setBudgetId(itemValue)} // Assurez-vous que setBudgetId est défini
          style={{ height: 50 }}
        >
          <Picker.Item label="Sélectionner un budget" value="" />
          {Array.isArray(budgets) &&
            budgets.map((budget) => (
              <Picker.Item
                key={budget._id}
                label={`${budget.description} - ${budget.amount} Franc AES`}
                value={budget._id}
              />
            ))}
          {/* {budgets.map(
            (
              budgets // Assurez-vous que 'budgets' est un tableau d'objets budget
            ) => (
              <Picker.Item
                key={budgets._id}
                label={`${budgets.description} - ${budgets.amount} Franc AES`} // Adaptez selon vos besoins
                value={budgets._id}
              />
            )
          )} */}
        </Picker>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Picker
          selectedValue={categoryId}
          onValueChange={(itemValue) => setCategoryId(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Sélectionner une catégorie" value="" />
          {Array.isArray(categories) &&
            categories.map((category) => (
              <Picker.Item
                key={category._id}
                label={category.name}
                value={category._id}
              />
            ))}
        </Picker>
      </View>
      <TouchableOpacity
        onPress={handleCreateTransaction}
        style={{
          backgroundColor: "#078ECB",
          borderRadius: 10,
          padding: 10,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Créer Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({});
