import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './../config/index';
import { UserContext, useUser } from '../UserContext';

const AddBudget = () => {
  const { user } = useUser() || {}; // Vérification du contexte utilisateur

  // Vérifiez si l'utilisateur est chargé
  if (!user) {
    return <Text>Chargement...</Text>; // Affichez un message de chargement
  }


  const [userId, setUserId] = ("");
  const [categoryId, setCategoryId] = useState('');
  const [period, setPeriod] = useState('mensuel');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  const handleCreateBudget = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');

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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(budgetData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Erreur lors de la création du Budget");
      }

      const data = await response.json();
      console.log(data);
      setAmount("");
      setDescription("");
      setPeriod("");
      setCategoryId("");
      navigation.navigate('Budget');
    } catch (error) {
      console.error('Erreur lors de la création du budget', error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId'); // Assurez-vous que c'est la bonne clé
      if (id) {
        setUserId(id);
      } else {
        console.error("User ID manquant dans AsyncStorage");
      }
    };
  
    fetchUserId();
  }, []);
  
  

  useEffect(() => {
    // Récupérer les catégories depuis la base de données
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await fetch(API_URL.getCategories, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText || "Erreur lors de la récupération des catégories");
        }
  
        const data = await response.json();
        setCategories(data.categories); // Stocker les données dans l'état
        console.log('Catégories récupérées:', data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
  
    fetchCategories();
  }, []);



  return (
    <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ajouter un Budget</Text>
    
    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginTop: 10 }}>
        <Picker
          selectedValue={categoryId}
          onValueChange={(itemValue) => setCategoryId(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Sélectionner une catégorie" value="" />
          {Array.isArray(categories) && categories.map((category) => (
            <Picker.Item key={category._id} label={category.name} value={category._id} />
          ))}
        </Picker>
      </View>

      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginTop: 10 }}>
        <Picker
          selectedValue={period}
          onValueChange={(itemValue) => setPeriod(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Mensuel" value="mensuel" />
          <Picker.Item label="Trimestriel" value="trimestriel" />
          <Picker.Item label="Semestriel" value="semestriel" />
          <Picker.Item label="Annuel" value="annuel" />
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
        borderColor: '#ccc',
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
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
      }}
    />

    <TouchableOpacity
      onPress={handleCreateBudget}
      style={{
        backgroundColor: '#078ECB',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Créer Budget</Text>
    </TouchableOpacity>
  </View>
);
}

export default AddBudget

const styles = StyleSheet.create({})