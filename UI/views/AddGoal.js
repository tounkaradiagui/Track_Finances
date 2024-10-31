import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { API_URL } from "../config";

const AddGoal = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleCreateGoal = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");

      const numericTargetAmount = Number(targetAmount);
      if (numericTargetAmount <= 0) {
        Toast.show({
          text1: "Erreur",
          text2: "Le montant cible doit être supérieur à zéro.",
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }

      const response = await fetch(API_URL.createGoal, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          targetAmount: numericTargetAmount,
          deadline,
          description,
          frequency,
          userId,
        }),
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

      // Réinitialiser le formulaire
      setName("");
      setTargetAmount("");
      setDeadline("");
      setDescription("");
      setFrequency("Mensuelle");

      navigation.goBack("Goal");
      Toast.show({
        type: "success",
        text1: "Félicitations !!",
        text2: "Objectif ajouté avec succès !",
        position: "top",
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Ajouter un objectif financier
      </Text>

      <TextInput
        placeholder="Nom de l'objectif...Nouvelle voiture, voyage, etc."
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Montant cible"
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Date limite (JJ/MM/AAAA)"
        value={deadline}
        onChangeText={setDeadline}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => setFrequency(itemValue)}
          style={styles.picker}
          >
          {/* // enabled={!!name && !!targetAmount && !!deadline} */}
          <Picker.Item label="Choisissez une fréquence" value="" enabled={false}/>
          <Picker.Item label="Journalière" value="Journalière" />
          <Picker.Item label="Mensuelle" value="Mensuelle" />
          <Picker.Item label="Trimestrielle" value="Trimestrielle" />
          <Picker.Item label="Semestrielle" value="Semestrielle" />
          <Picker.Item label="Annuelle" value="Annuelle" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleCreateGoal}
        style={styles.button}
        disabled={loading}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {loading ? "En cours..." : "Créer l'objectif"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#078ECB",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  picker: {
    height: 50,
  },
});
