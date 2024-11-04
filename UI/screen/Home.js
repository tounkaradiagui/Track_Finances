import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../UserContext";
import { API_URL } from "../config";
import Toast from "react-native-toast-message";

const Home = () => {
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  // Fonction pour obtenir la salutation selon le moment de la journée
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Bonjour"; // Matin
    } else if (hour < 18) {
      return "Bon après-midi"; // Après-midi
    } else {
      return "Bonsoir"; // Soir
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("fr-FR", options); // Format français
  };

  const fetchUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUser(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.log(
        "Erreur lors de la récupération des informations utilisateur :",
        error
      );
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL.getTransactions, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Vérifiez si la réponse est correcte
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

      const data = await response.json();
      setTransactions(data.transactions);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userId");
      const response = await fetch(`${API_URL.fetchGoals}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Vérifiez si la réponse est correcte
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      // console.log(data);

      // Formater les dates et trier les objectifs ici
      const formattedGoals = data.map((goal) => ({
        ...goal,
        deadline: formatDate(goal.deadline), // Formater la date
      }));

      // Trier les objectifs par date de création (plus récent en premier)
      const sortedGoals = Array.isArray(formattedGoals)
        ? formattedGoals.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];
      setGoals(sortedGoals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
      fetchTransactions();
      fetchGoals();
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#078ECB" style="light" />
        <View>
          <View style={styles.headerTop}>
            <Text style={styles.salutation}>{getGreeting()},</Text>
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.name}>
                {user.prenom} {user.nom} !
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Ionicons name="notifications" size={24} color="#078ECB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Section des Statistiques */}
          {/* <View style={styles.statsContainer}>
            
          </View> */}

          {/* Transactions */}
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 15,
              padding: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#E9B94E",
              marginHorizontal: 15,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View>
              <Text style={styles.name}>Dernières Transactions</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("Transaction")}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                >
                  Voir
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              backgroundColor: "#078ECB",
              marginHorizontal: 15,
            }}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Chargement...</Text>
              </View>
            ) : transactions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Aucune transaction disponible
                </Text>
              </View>
            ) : (
              transactions.slice(0, 3).map((transaction, index) => (
                <View key={transaction._id}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      backgroundColor: "#078ECB",
                      borderBottomLeftRadius: index === 2 ? 20 : 0,
                      borderBottomRightRadius: index === 2 ? 20 : 0,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Entypo name="shopping-cart" size={24} color="white" />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        {transaction.type}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#E9B94E",
                      }}
                    >
                      {transaction.amount} F CFA
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "white",
                      marginLeft: 34, // Pour aligner avec l'icône et le texte
                      marginTop: 5,
                    }}
                  >
                    {new Date(transaction.createdAt).toLocaleString("fr-FR")}
                  </Text>

                  {index < transactions.length - 1 && (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        marginVertical: 10,
                      }}
                    />
                  )}
                </View>
              ))
            )}
          </View>

          {/* Objectif financiers */}
          {/* Objectif financiers */}
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 15,
              padding: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#E9B94E",
              marginHorizontal: 15,
            }}
          >
            <View>
              <Text style={styles.name}>Objectifs Financiers</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("Goal")}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                >
                  Voir
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              backgroundColor: "#078ECB",
              marginHorizontal: 15,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Chargement...</Text>
              </View>
            ) : goals.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucun objectif disponible</Text>
              </View>
            ) : (
              goals.slice(0, 2).map((goal, index) => (
                <View key={goal._id}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      backgroundColor: "#078ECB",
                      borderBottomLeftRadius: index === 1 ? 20 : 0,
                      borderBottomRightRadius: index === 1 ? 20 : 0,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Entypo name="shopping-cart" size={24} color="white" />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        {goal.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#E9B94E",
                      }}
                    >
                      {goal.targetAmount} F CFA
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "white",
                      marginLeft: 34,
                      marginTop: 5,
                    }}
                  >
                    Date ciblée : {goal.deadline}
                  </Text>
                  {index < transactions.length - 1 && (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        marginVertical: 10,
                      }}
                    />
                  )}
                </View>
              ))
            )}
          </View>

          {/* Epargne */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  salutation: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statsContainer: {
    padding: 15,
    backgroundColor: "#E9B94E",
    borderRadius: 10,
    margin: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 16,
  },
  financialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  financialButton: {
    padding: 20,
    backgroundColor: "#078ECB",
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  financialText: {
    fontSize: 18,
    color: "#fff",
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#078ECB",
    borderRadius: 10,
    margin: 15,
  },
  seeAllText: {
    fontSize: 16,
    color: "#fff",
  },
  transactionItem: {
    padding: 15,
    backgroundColor: "#E9B94E",
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionText: {
    fontSize: 16,
    color: "#fff",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
