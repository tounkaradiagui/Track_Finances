import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './../config/index';
import { useNavigation } from '@react-navigation/native';

const CreateCategory = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateCategory = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(API_URL.createCategory, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création de la catégorie");
      }

      setName('');
      setDescription('');
      navigation.navigate("Categories");
      Alert.alert("Succès", "Catégorie créée avec succès !");
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ajouter une Catégorie</Text>
      <TextInput
        placeholder="Nom de la catégorie"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
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
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
          height: 100,
        }}
      />
      <TouchableOpacity
        onPress={handleCreateCategory}
        style={{
          backgroundColor: '#078ECB',
          borderRadius: 10,
          padding: 10,
          marginTop: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Créer Catégorie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCategory;
