import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API_URL } from "../config";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Goal = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progresses, setProgresses] = useState({});

  const navigation = useNavigation();

  const getProgressColor = (progress) => {
    if (progress > 70) return "#4caf50"; // Vert
    if (progress > 30) return "#ff9800"; // Orange
    return "#ff0000"; // Rouge
  };

  const calculateProgress = (goal) => {
    if (goal && goal.targetAmount > 0) {
      const { currentSaved, targetAmount } = goal;
      return (currentSaved / targetAmount) * 100;
    }
    return 0;
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("fr-FR", options); // Format français
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
      console.log("Fetch goals error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGoals();
    }, [])
  );

  useEffect(() => {
    const newProgresses = {};
    goals.forEach((goal) => {
      newProgresses[goal._id] = calculateProgress(goal);
    });
    setProgresses(newProgresses);
  }, [goals]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Objectifs Financiers</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddGoal")}>
          <AntDesign name="plussquare" size={30} color={"#E9B94E"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : goals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun objectif disponible</Text>
        </View>
      ) : (
        goals.map((goal) => {
          const progress = progresses[goal._id] || 0;
          const progressColor = getProgressColor(progress);
          return (
            <TouchableOpacity
              key={goal._id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("ShowGoal", { goalId: goal._id })
              } // Navigation ici
            >
              <View style={styles.row}>
                <View style={styles.textContainer}>
                  <Text style={styles.goalName}>
                    {"Objectif --> " + goal.name}
                  </Text>
                  <View style={styles.separator} />
                  <Text style={styles.goalAmount}>
                    Épargne actuelle: {goal.currentSaved}
                  </Text>
                  <Text style={styles.goalAmount}>
                    Montant ciblé: {goal.targetAmount}
                  </Text>
                  <Text style={styles.goalAmount}>
                    Date limite ciblée: {goal.deadline}
                  </Text>
                  <Text style={styles.goalAmount}>
                    Fréquence d'épargne: {goal.frequency}
                  </Text>
                </View>
                <Progress.Circle
                  progress={progress / 100}
                  size={60}
                  thickness={8}
                  color={progressColor}
                  showsText={true}
                  formatText={() => `${progress.toFixed(0)}%`}
                />
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343A40",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  goalName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  separator: {
    height: 2,
    backgroundColor: "#E9B94E",
    marginVertical: 5,
  },
  goalAmount: {
    marginVertical: 5,
  },
});
