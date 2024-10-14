import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { API_URL } from './../config/index';

const Register = () => {

  const [isSelected, setSelection] = useState(false);
  
  const handleCheckedboxChange = () => {
    setSelection(!isSelected);
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigation = useNavigation();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userData = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };

      const response = await fetch(API_URL.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)        
      });

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de inscription');
      }

      const data = await response.json();
      console.log(data);
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate('Login');
      Alert.alert('Inscription réussie', 'Bienvenue !');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView style={{ 
            width: "100%", 
            marginTop:40
        }}>
          <View style={{alignItems:"flex-start", marginLeft:25, marginBottom:30 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold"}}>Création de votre compte</Text>
          </View>

          <View style={{ width:"90%", marginLeft:"auto", marginRight:"auto", marginBottom:20}}>
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
                name="person"
                size={24}
                color="black"
              />
              <TextInput
                require={true}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
                style={{ 
                  width: 250,
                  borderColor: "#078ECB",
                  marginBottom:"auto",
                  color: "black",
                  width:"100%",
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

          <View style={{ width:"90%", marginLeft:"auto", marginRight:"auto", marginBottom:20}}>
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
                name="person"
                size={24}
                color="black"
              />
              <TextInput
                require={true}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
                style={{ 
                  width: 250,
                  borderColor: "#078ECB",
                  marginBottom:"auto",
                  color: "black",
                  width:"100%",
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

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
                // padding: 20
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderWidth: 2,
                borderColor: "#078ECB",
                paddingVertical: 10,
                borderRadius: 5,
                // padding: 20
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 5 }}
                name="lock"
                size={24}
                color="black"
              />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={{ width: 250 }}
                placeholder="Confirmer le Mot de passe"
              />

              <MaterialCommunityIcons
                onPress={toggleConfirmPasswordVisibility}
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="black"
                marginRight={5}
              />
            </View>
          </View>

          <View>
            {/* <CheckBox
              title="J'accepte les termes et Conditons"
              checked={isSelected}
              onPress={handleCheckedboxChange}
              checkedIcon="dot-circle-o"
            /> */}
          </View>

          <View style={{ width:"90%", marginLeft:"auto", marginRight:"auto", marginTop:10 }}>
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
              onPress={handleRegister}
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
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ fontWeight: "bold", textAlign: "center"}}
              >
                Déjà inscrit ? Se Connecter
              </Text>
            </TouchableOpacity>
            
          </View>
        </KeyboardAvoidingView>



      </ScrollView>
    </SafeAreaView>
  )
}

export default Register;