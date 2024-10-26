import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../UserContext';
import { API_URL } from '../config';
import Toast from 'react-native-toast-message';

const Security = () => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    const authToken = await AsyncStorage.getItem('authToken');

    try {
      const response = await fetch(`${API_URL.deleteAccount}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userInfo');
        setUser(null);
        Toast.show({
          type: "success",
          text1: "Suppression de votre compte",
          text2:"Votre compte a été supprimé avec succès.",
          position: "top",
          visibilityTime: 5000,
        });

      } else {
        const errorData = await response.json();
        Toast.show({
          text1: "Erreur",
          text2: errorData.message,
          type: "error",
          position: "top",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        text1: "Erreur",
        text2: "Une erreur est survenue. Veuillez réessayer plus tard",
        type: "error",
        });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: handleDeleteAccount },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="alert-circle-outline" size={30} color="red" />
        <Text style={styles.title}>Supprimer mon compte</Text>
      </View>
      <Text style={styles.instruction}>
        Cette action supprimera définitivement votre compte et toutes vos données associées.
        Si vous avez des doutes, envisagez de modifier vos informations plutôt que de supprimer votre compte.
      </Text>
      <Button
        title={loading ? "Suppression en cours..." : "Supprimer le compte"}
        onPress={confirmDelete}
        disabled={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default Security;