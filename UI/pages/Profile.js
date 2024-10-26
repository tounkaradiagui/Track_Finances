import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useTheme } from "../context/ThemeContext";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config";
import Toast from "react-native-toast-message";

const Profile = () => {
  const { user, setUser } = useUser();
  const { darkModeEnabled } = useTheme();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!user) {
    return <Text>Chargement...</Text>;
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("fr-FR", options);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${formattedDate} à ${hours}:${minutes}`;
  };

  const handleLogout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Token removed");
    setUser(null);
    navigation.navigate("PublicScreen", { screen: "Login" });
    Toast.show({
      type: "success",
      text1: "Féliciations !!",
      text2: "Vous êtes deconnecté !",
      position: "top",
      visibilityTime: 5000,
    });
  };

  const fetchUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUser(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur :",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchUserInfo();
  //   }, [])
  // );

  if (!user) {
    return <Text>Chargement...</Text>; // Affichez un message de chargement
  }

  return (
    <ScrollView
      style={[
        styles.container,
        darkModeEnabled ? styles.darkContainer : styles.lightContainer,
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar backgroundColor="#078ECB" style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <TouchableOpacity>
            <View style={styles.ProfilePicture}>
              <Image
                source={{
                  uri:
                    user.avatar ||
                    "https://www.congres-detergence.com/images/intervenants/photo-avatar-profil.png",
                }}
                style={styles.ProfilePicture}
              />
              {/* <Image
                source={require("../assets/images/profile-picture.jpg")}
                style={styles.ProfilePicture}
              /> */}
            </View>
            <View style={styles.FeatherIcon}>
              <FontAwesome name="camera" size={15} color="white" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {user.prenom} {user.nom}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {user.email}
            </Text>

            <Text
              style={[
                styles.text,
                darkModeEnabled ? styles.darkText : styles.lightText,
              ]}
            >
              Dernière connexion : {formatDate(user.lastLogin)}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#078ECB",
            marginHorizontal: 20,
            marginTop: 10,
          }}
        ></View>

        {/* Notifications */}
        <TouchableOpacity style={styles.option}>
          <FontAwesome
            name="bell"
            size={24}
            color="#078ECB"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Notifications</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        {/* Paramètres */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Settings")}
        >
          <MaterialIcons
            name="settings"
            size={24}
            color="#078ECB"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Paramètres</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        {/* A Propos */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("About")}
        >
          <MaterialIcons
            name="help"
            size={24}
            color="#078ECB"
            style={styles.icon}
          />
          <Text style={styles.optionText}>A Propos</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <SimpleLineIcons
            name="logout"
            size={24}
            color="#078ECB"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Déconnexion</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  profile: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  ProfilePicture: {
    width: 100,
    height: 100,
    borderRadius: 230,
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  header: {
    paddingVertical: 10,
    marginTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 20,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});
