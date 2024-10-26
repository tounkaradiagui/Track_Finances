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

    if (!prenom || !nom || !email) {
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
      id: userId,
      prenom: prenom,
      nom: nom,
      email: email,
      image: image,
    };

    if (userId) {
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: image,
          name: "profile.jpg",
          type: "image/jpeg",
        });
        formData.append("userData", JSON.stringify(userData));
        const response = await fetch(`${API_URL.editUserProfile}/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          // console.error("Erreur lors de la mise à jour :", errorData);
          Toast.show({
            type: "error",
            text1: "Erreur",
            text2: errorData.message || "Veuillez réessayer plus tard",
            position: "top",
            visibilityTime: 3000,
          });
          return;
        }

        const updatedUserData = await response.json();
        // console.log("Données mises à jour :", updatedUserData);

        // Mettez à jour le contexte et les états locaux
        setUser((prev) => ({
          ...prev,
          prenom: updatedUserData.user.prenom || prev.prenom,
          nom: updatedUserData.user.nom || prev.nom,
          email: updatedUserData.user.email || prev.email,
          image: updatedUserData.user.image || prev.image,
        }));

        // Mettre à jour les états locaux
        setPrenom(updatedUserData.user.prenom || "");
        setNom(updatedUserData.user.nom || "");
        setEmail(updatedUserData.user.email || "");
        setImage(updatedUserData.user.image || "");

        Toast.show({
          type: "success",
          text1: "Profil mis à jour avec succès",
          text2:
            "Vous pouvez maintenant vous connecter avec vos nouvelles infos",
          position: "top",
          visibilityTime: 5000,
        });

        await loadUserData(); // Assurez-vous que cela appelle la bonne URL
        navigation.navigate("Profile");
      } catch (error) {
        // console.error("Erreur lors de la mise à jour des données :", error);
        Toast.show({
          text1: "Erreur",
          text2: "Échec de la mise à jour. Veuillez réessayer.",
          type: "error",
        });
      }
    }
  };

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   console.log(result);
    // } else {
    //   alert('You did not select any image.');
    // }
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
      // URL de la requête
      // console.log("Requête vers l'URL :", url);

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
      // Charge les données si l'utilisateur n'est pas déjà présent
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
            <Image source={{ uri: image }} style={styles.ProfilePicture} />
          ) : (
            <Image
              source={require("../assets/images/profile-picture.jpg")}
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
