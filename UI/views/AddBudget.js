import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../config/index";
import { useUser } from "../UserContext";
import Toast from "react-native-toast-message";

const AddBudget = () => {
  const { user } = useUser() || {}; // Vérification du contexte utilisateur

  // Vérifiez si l'utilisateur est chargé
  if (!user) {
    return <Text>Chargement...</Text>; // Affichez un message de chargement
  }
  const [categoryId, setCategoryId] = useState("");
  const [period, setPeriod] = useState("mensuel");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);


  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  const handleCreateBudget = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");

      const budgetData = {
        userId,
        categoryId,
        period,
        description,
        amount: parseFloat(amount),
      };

      if (isNaN(budgetData.amount)) {
        throw new Error("Montant invalide");
      }

      const response = await fetch(API_URL.AddBudget, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(budgetData),
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
      // console.log(data);
      Toast.show({
        type: "success",
        text1: "Féliciations !!",
        text2: "Votre budget a été ajouté avec succès !",
        position: "top",
        visibilityTime: 5000,
      });
      setAmount("");
      setDescription("");
      setPeriod("");
      setCategoryId("");
      navigation.goBack("Budget");
    } catch (error) {
        Toast.show({
          text1: "Erreur",
          text2: error.message,
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
      // console.error("Erreur lors de la création du budget", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Récupérer les catégories depuis la base de données
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
        setCategories(data.categories); // Stocker les données dans l'état
        // console.log("Catégories récupérées:", data);
      } catch (error) {
        Toast.show({
          text1: "Erreur",
          text2: error.message,
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        // console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Ajouter un Budget
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

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Picker
          selectedValue={period}
          onValueChange={(itemValue) => setPeriod(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Mensuel" value="Mensuel" />
          <Picker.Item label="Trimestriel" value="Trimestriel" />
          <Picker.Item label="Semestriel" value="Semestriel" />
          <Picker.Item label="Annuel" value="Annuel" />
        </Picker>
      </View>

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

      <TouchableOpacity
        onPress={handleCreateBudget}
        style={{
          backgroundColor: "#078ECB",
          borderRadius: 10,
          padding: 10,
          marginTop: 20,
          alignItems: "center",
        }}
        disabled={loading}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {loading ? "En cours..." : " Créer Budget"}
         </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBudget;

const styles = StyleSheet.create({});
