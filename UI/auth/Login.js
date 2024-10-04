import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from '../UserContext';
import { StatusBar } from 'expo-status-bar';

const Login = () => {

  // const APP_URL = process.env.APP_URL;
  // PORT = process.env.PORT;
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = {
        email: email,
        password: password
      };

      const response = await fetch(`http://192.168.106.140:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Vérifier si la réponse est correcte
      if (!response.ok) {
        const errorData = await response.json(); // Essaye de récupérer des informations sur l'erreur
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      console.log('Données de l’utilisateur:', data);

      // Stocker le token ou les informations de l'utilisateur dans AsyncStorage
      await AsyncStorage.setItem('authToken', data.token);

      const userInfos = { userId: data.user._id, nom: data.user.nom, email: data.user.email };
      setUser(userInfos); // Met à jour le contexte utilisateur
      console.log(userInfos);

      // Naviguer vers l'écran principal ou faire autre chose après la connexion
      navigation.navigate('ProtectedData');       
      Alert.alert('Connexion réussie', 'Bienvenue !');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#078ECB'} style='light'/>
      <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("../assets/images/myOfficialLogo.png")}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 200,
              marginTop: 50,
            }}
          />

        <KeyboardAvoidingView>
          <View style={{ alignItems: "flex-start", marginLeft: 25 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Welcome Back !</Text>
          </View>
 
          <View style={{ width: "100%", marginTop:10 }}>
            
            <View style={{ width:"90%", marginLeft:"auto", marginRight:"auto"}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 2,
                  borderColor: "#078ECB",
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 5 }}
                  name="email"
                  size={24}
                  color="black"
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Adresse Email"
                  style={{
                    
                    borderColor: "#078ECB",
                    color: "black",
                    width:"100%",
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>

            <View style={{ width:"90%", marginLeft:"auto", marginRight:"auto", marginTop:20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  borderWidth: 2,
                  borderColor: "#078ECB",
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 5 }}
                  name="lock"
                  size={24}
                  color="black"
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={{ width: 250 }}
                  placeholder="Mot de passe"
                />

                <MaterialCommunityIcons
                  onPress={togglePasswordVisibility}
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                  marginRight={5}
                />
              </View>
            </View>

            <View style={{ width:"90%", marginLeft:"auto", marginRight:"auto", marginTop:20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#078ECB",
                  borderRadius: 10,
                  padding: 5,
                  borderColor: "#078ECB",
                  width: "100%",
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={handleLogin}
              >
                <Text
                  style={{
                    borderColor: "#078ECB",
                    padding: 10,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  Connexion
                </Text>
              </TouchableOpacity>
            </View>       

            <TouchableOpacity style={{ padding: 25, alignItems: "center", paddingTop: 10 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "red", fontWeight: "bold"}}>
                Mot de Passe oublié ?
              </Text>
            </TouchableOpacity>
           
          </View>

          <View style={{ padding: 25, alignItems: "center", paddingTop: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{ fontWeight: "bold", textAlign: "center"}}
              >
                Pas encore inscrit ? Cliquez Ici pour s'inscrire
              </Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({});