import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.optionText}>Modifier mon profil</Text>
        <AntDesign name="right" size={20} color="#E9B94E" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.optionText}>Changer le mot de passe</Text>
        <AntDesign name="right" size={20} color="#E9B94E" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Security')}>
        <Text style={styles.optionText}>Sécurité</Text>
        <AntDesign name="right" size={20} color="#E9B94E" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.optionText}>Politique de confidentialité</Text>
        <AntDesign name="right" size={20} color="#E9B94E" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
