import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../config'; // Assure-toi que cela correspond à ta configuration
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email
    return emailRegex.test(email);
  };

  const handleRequestReset = async () => {
    if (!email) {
      // Vérifier si le champ est rempli
      if(!email) {
        Toast.show({
          text1: "Erreur",
          text2: "Veuillez entrer votre email.",
          type: "error",
          position: 'top',
          visibilityTime: 3000, 
        });

        setLoading(false);
        return;
      }

      // Validation de l'email
      if (!isValidEmail(email)) {
        Toast.show({
            text1: "Erreur",
            text2: "Veuillez entrer un email valide.",
            type: "error",
            position: 'top',
            visibilityTime: 3000, 
        });
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL.requestReset}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        return;
      }
      Toast.show({
        type: "success",
        text1: "Féliciations !!",
        text2: `Un lien de réinitialisation a été envoyé à votre e-mail`,
        position: "top",
        visibilityTime: 5000,
      });
      navigation.navigate('Login');
    } catch (error) {
      Toast.show({
        text1: "Erreur",
        text2: error.message,
        type: "error",
        position: 'top',
        visibilityTime: 3000, 
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Réinitialiser votre mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRequestReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#078ECB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});