import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { useUser } from "../UserContext";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

const EditProfile = () => {
  const { user, setUser } = useUser();
  if (!user) {
    return <Text>Chargement...</Text>; // Affichez un message de chargement
  }

  const navigation = useNavigation();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  // Fonction pour enregistrer les modifications
  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");
  
    if (!prenom || !nom) {
      Toast.show({
        type: "error",
        text1: "Erreur de validation",
        text2: "Tous les champs doivent être remplis.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }
  
    const userData = {
      prenom: prenom,
      nom: nom,
      email: email,
    };
  
    if (userId) {
      try {
        const formData = new FormData();
        if (image) {
          formData.append("file", {
            uri: image,
            name: "profile.jpg",
            type: "image/jpeg",
          });
        }
  
        formData.append("prenom", prenom);
        formData.append("nom", nom);
        formData.append("email", email);
  
        const response = await fetch(`${API_URL.editUserProfile}/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "multipart/form-data", // Set multipart form data
          },
          body: formData, // Send the formData
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
  
        const updatedUserData = await response.json();
  
        // Ensure the image URL is valid
        const imageUrl = updatedUserData.user.image
          ? `${API_URL}/uploads/${updatedUserData.user.image}`
          : updatedUserData.user.image;
  
        setUser((prev) => ({
          ...prev,
          prenom: updatedUserData.user.prenom || prev.prenom,
          nom: updatedUserData.user.nom || prev.nom,
          email: updatedUserData.user.email || prev.email,
          image: imageUrl || prev.image,
        }));
  
        setPrenom(updatedUserData.user.prenom || "");
        setNom(updatedUserData.user.nom || "");
        setEmail(updatedUserData.user.email || "");
        setImage(updatedUserData.user.image || "");
  
        Toast.show({
          type: "success",
          text1: "Profil mis à jour avec succès",
          text2: "Vous pouvez maintenant vous connecter avec vos nouvelles infos",
          position: "top",
          visibilityTime: 5000,
        });
  
        navigation.goBack("Profile");
      } catch (error) {
        console.log("Erreur :", error);
        Toast.show({
          text1: "Erreur",
          text2: "Échec de la mise à jour. Veuillez réessayer.",
          type: "error",
        });
      }
    }
  };
  
  

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      console.log(pickerResult);
      setImage(pickerResult.uri);
    }
  };

  const loadUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("ID utilisateur introuvable.");
      }

      const url = `${API_URL.editUserProfile}/${userId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

      const userData = JSON.parse(responseText); // Parsez la réponse en JSON
      setPrenom(userData.prenom || "");
      setNom(userData.nom || "");
      setEmail(userData.email || "");
    } catch (error) {
      Toast.show({
        text1: "Erreur",
        text2: "Échec de la récupération des données. Veuillez réessayer.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setPrenom(user.prenom);
      setNom(user.nom);
      setEmail(user.email);
      setImage(user.image);
    } else {
      // Charger les données si l'utilisateur n'est pas déjà présent
      loadUserData();
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Modifier le Profil</Text>

      {/* {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Choisir une image</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={pickImage}>
        <View style={styles.ProfilePicture}>
          {image ? (
            <Image source={{ uri: `${API_URL}/uploads/${image}` }} style={styles.ProfilePicture} />
          ) : (
            <Image
              source={{uri: user.avatar }}
              style={styles.ProfilePicture}
            />
          )}
          <View style={styles.FeatherIcon}>
            <FontAwesome name="camera" size={15} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image circular
    overflow: "hidden", // Ensures any overflow is hidden
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#333",
    fontSize: 16,
  },
  ProfilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular shape
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  FeatherIcon: {
    width: 28,
    height: 28,
    backgroundColor: "#078ECB",
    position: "absolute",
    borderRadius: 30,
    alignItems: "center",
    right: -5,
    bottom: 2,
    paddingTop: 4,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#078ECB",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;
