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
  import React, {useState} from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
  
  const Profile = () => {
    // const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    // const toggleSwitch = () => {
    //   setDarkModeEnabled(!darkModeEnabled);
    // };
  
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.profile}>
            <StatusBar backgroundColor="#078ECB" color="#fff"/>
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
                Diagui Tounkara
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                tounkaradiagui@gmail.com
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
              }}>Support</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
  
          <TouchableOpacity
          style={styles.touchable}
          >
            <MaterialIcons
              name="policy"
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
                marginLeft:-65
              }}>Termes et conditions</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
  
         
          {/* -Préférences
          Mon Profil
          Mode Nuit
          Paramètre
          -Aide
          Signaler un problème
          Nous Contactez
          Déconnexion */}
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
    }
  });  