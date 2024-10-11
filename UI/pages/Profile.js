import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Switch
  } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";

import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
  
  const Profile = () => {
    const {user, setUser } = useUser();
    // Vérifiez si l'utilisateur est chargé
    if (!user) {
      return <Text>Chargement...</Text>; // Affichez un message de chargement
    }

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const userToken = await AsyncStorage.getItem('authToken');
              const userId = await AsyncStorage.getItem('userId');
  
              if (userToken) {
                  // Récupérer les informations utilisateur
                  const userData = await AsyncStorage.getItem('userInfo');
                  const parsedUserData = JSON.parse(userData); // Ici, vous devez parser les données utilisateur
  
                  if (parsedUserData) {
                      setUser({
                          userId: userId,
                          nom: parsedUserData.nom,
                          prenom: parsedUserData.prenom,
                          email: parsedUserData.email,
                          lastLogin: parsedUserData.lastLogin
                      });
                  } else {
                      console.error('Aucune donnée utilisateur trouvée.');
                  }
              }
          } catch (error) {
              console.error('Erreur lors de la récupération des données utilisateur:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchUserData();
  }, [setUser]);
  
  if (loading) {
    return <Text>Chargement...</Text>;
  }

    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('fr-FR', options);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
  
      return `${formattedDate} à ${hours}:${minutes}`;
    };
    // const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    // const toggleSwitch = () => {
    //   setDarkModeEnabled(!darkModeEnabled);
    // };

    const handleLogout = () => {
      clearAuthToken();
    }

    const clearAuthToken = async () => {
      await AsyncStorage.removeItem('authToken');
      console.log('Token removed');
      setUser("");
      navigation.navigate("PublicScreen");
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#078ECB" style="light"/>
        {user ? (
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.profile}>
              <TouchableOpacity>
                <View style={styles.ProfilePicture}>
                  <Image
                    source={require("../assets/images/profile-picture.jpg")}
                    style={styles.ProfilePicture}
                  />
                </View>
                <View style={styles.FeatherIcon}>
                  <FontAwesome name="camera" size={15} color="white" />
                  {/* <Feather name="edit" size={15} color="white" /> */}
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
                  {user.prenom} { user.nom}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {/* tounkaradiagui@gmail.com */}
                  {user.email}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                 Dernière connexion : {formatDate(user.lastLogin)}
                </Text>
              
              </View>
            </View>
    
            <View style={{paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:"#078ECB", marginHorizontal:20, marginTop:10}}>
              <Text style={{fontSize:18, marginLeft:-20}}>Préférences</Text>
            </View>
    
            <View style={styles.dark}>
              <Ionicons
                  name="sunny"
                  size={24}
                  color="#078ECB"
                  style={{
                    // backgroundColor: "#078ECB",
                    borderRadius: 20,
                    marginLeft:10
                  }}
                />
                <Text style={{
                    fontSize:18,
                    marginLeft:-180
                  }}>Thème 
                  {/* {darkModeEnabled ? "sombre" : "clair"} */}
                </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                {/* <Switch
                  value={darkModeEnabled}
                  onValueChange={toggleSwitch}
                /> */}
            </View>
    
            <TouchableOpacity
              style={styles.touchable}
            >
              <MaterialIcons
                name="person"
                size={24}
                color="#078ECB"
                style={{
                  justifyContent: "center",
                  borderRadius: 30,
                  marginLeft:10
                }}
              />
              <View 
              >
                <Text style={{
                  fontSize:18,
                  marginLeft:-80
                }}>Modifier Mon Profil</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
    
            <TouchableOpacity
            style={styles.touchable}
            >
              <FontAwesome
                name="bell"
                size={24}
                color="#078ECB"
                style={{
                  borderRadius: 20,
                  marginLeft:10
                }}
              />
              <View 
              >
                <Text style={{
                  fontSize:18,
                  marginLeft:-115
                }}>Notifications</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.touchable}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color="#078ECB"
                style={{
                  borderRadius: 20,
                  marginLeft:10
                }}
              />
              <View 
              >
                <Text style={{
                  fontSize:18,
                  marginLeft:-115
                }}>Paramètre</Text>
                {/* Theme, Modifier mon profil, Changer le mot de passe doivent etre dans parametre */}
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
    
            <View style={{paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:"#078ECB", marginHorizontal:20, marginTop:20}}>
              <Text style={{fontSize:18, marginLeft:-20}}>Aide</Text>
            </View>
    
            <TouchableOpacity
              style={styles.touchable}
            >
              <MaterialIcons
                name="help"
                size={24}
                color="#078ECB"
                style={{
                  justifyContent: "center",
                  borderRadius: 30,
                  marginLeft:10
                }}
              />
              <View 
              >
                <Text style={{
                  fontSize:18,
                  marginLeft:-115
                }}>A Propos</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
    
            <TouchableOpacity
              style={styles.logout}
              onPress={handleLogout}
            >
                <SimpleLineIcons name="logout" size={20} color="#078ECB" style={{
                  borderRadius: 20,
                  marginLeft:10
                }}/>
              <View 
              >
                <Text style={{
                  fontSize:18,
                  marginLeft:15
                }}>Déconnexion</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        ) : ("Aucun utilisateur connecté" )}
      </SafeAreaView>

    );
  };
  
  export default Profile;
  
  const styles = StyleSheet.create({
    
    profile: {
      padding: 24,
      alignItems: "center",
      justifyContent: "center",
      marginTop:20
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
    section: {
      paddingHorizontal: 24,
    },
    sectionHeader: {
      paddingVertical: 12,
      fontSize: 12,
      fontWeight: 500,
      color: "#fefefe",
      textTransform: "uppercase",
      letterSpacing: 1.1,
    },
    touchable:{
      flexDirection: "row",
      marginHorizontal: 20,
      paddingVertical: 10,
      justifyContent: "space-between",
      borderBottomColor: "#078ECB",
      borderBottomWidth: 1,
      marginTop:10,
      borderRadius:5,
      borderLeftWidth:1,
      borderLeftColor: "#078ECB",
    },
    dark:{
      flexDirection: "row",
      marginHorizontal: 20,
      paddingVertical: 10,
      justifyContent: "space-between",
      borderBottomColor: "#078ECB",
      borderBottomWidth: 1,
      borderLeftWidth:1,
      borderLeftColor: "#078ECB",
      marginTop:10,
      borderRadius:5
    },
    logout:{
      flexDirection: "row",
      marginHorizontal: 20,
      paddingVertical: 10,
      // justifyContent: "",
      borderBottomColor: "#078ECB",
      borderBottomWidth: 1,
      marginTop:10,
      borderRadius:5,
      borderLeftWidth:1,
      borderLeftColor: "#078ECB",
    }
  });  