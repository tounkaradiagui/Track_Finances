import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    await AsyncStorage.getItem("authToken");
    await AsyncStorage.getItem("userId");
  
    try {
      const response = await fetch(API_URL.getCategories, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Vérifiez si la réponse est correcte
      if (!response.ok) {
        return;
      }
  
      // Parsez la réponse JSON
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Erreur: ", error.message);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

<<<<<<< HEAD
=======
    //refresh the addresses when the component comes to the focus ie basically when we navigate back
    useFocusEffect(
      useCallback(() => {
        fetchCategories();
      }, [])
    );
>>>>>>> master

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              paddingVertical: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateCategory")}
              style={{
                backgroundColor: "#078ECB",
                paddingVertical: 30,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}
            >
              <View>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Ajouter Catégorie
                </Text>
              </View>
            </TouchableOpacity>
            {/* <View>
                <Text>Objectif Financier</Text>
              </View> */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Target")}
              style={{
                backgroundColor: "#078ECB",
                paddingVertical: 30,
                paddingHorizontal: 23,
                borderRadius: 10,
              }}
            >
              <View>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Fixer un Objectif
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBlockColor: "#078ECB",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Liste de Catégorie
            </Text>
          </View>
          {categories.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune catégorie disponible</Text>
            </View>
          ) : (
            categories.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    padding: 10,
                    marginTop: 20,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    backgroundColor: "#078ECB",
                    marginHorizontal: 20,
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome5
                        name="house-damage"
                        size={24}
                        color="white"
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        Date de création :{" "}
                        {new Date(item.createdAt).toLocaleString("fr-FR", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#E9B94E",
                    }}
                  >
                    {/* Montant ou autre info, si nécessaire */}
                  </Text>
                </View>
              </View>
            ))
          )}

          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBlockColor: "#078ECB",
              marginTop: 15,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Objectifs Financiers
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              // borderTopLeftRadius: 20,
              // borderTopRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="cash-refund"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Fond d'urgence
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "white", marginLeft:5 }}>Date</Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Mardi 24/10/2023 20:58 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $300
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              // borderTopLeftRadius: 20,
              // borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="house-damage" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Nouvelle maison
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "white", marginLeft:5 }}>Date</Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Mardi 24/10/2023 20:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $2500
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              // borderTopLeftRadius: 20,
              // borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="credit-card-refund"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Investissement
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "white", marginLeft:5 }}>Date</Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Mardi 24/10/2023 20:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $1800
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="laptop-code" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Mac Laptop
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "white", marginLeft:5 }}>Date</Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Mardi 24/10/2023 20:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $800
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});
