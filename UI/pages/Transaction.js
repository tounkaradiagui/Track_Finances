import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { COLORS } from "../constants";

const Transaction = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000)
  }, []);

  const fetchTransactions = async () => {
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
        return;
      }

      const data = await response.json();
      setTransactions(data.transactions);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(API_URL.getCategories, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      } else {
        const data = await response.json();
        setCategories(data.categories || []);
      }

    } catch (err) {
      console.error("Erreur lors de la récupération des catégories:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      fetchTransactions();
    }, [])
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTransactionItem = ({ item }) => {
    const category = categories.find((cat) => cat._id === item.categoryId);
    const categoryName = category ? category.name : "Aucune catégorie";
    const formattedAmount =
      item.type === "Dépense"
        ? `- ${item.amount} Franc AES`
        : `+ ${item.amount} Franc AES`;
    const amountStyle =
      item.type === "Dépense"
        ? styles.transactionAmountExpense
        : styles.transactionAmount;

    return (
      <View style={styles.transactionCard}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={amountStyle}>{formattedAmount}</Text>
        <Text style={styles.transactionDescription}>{categoryName}</Text>
        <Text style={styles.transactionDate}>{formatDate(item.createdAt)}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TransactionDetails", { transaction: item })}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsButtonText}>Consulter</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liste de Transaction</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddTransaction")}>
            <AntDesign name="plussquare" size={30} color="#E9B94E" />
          </TouchableOpacity>
        </View>
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune transaction disponible</Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            
          />
        )}
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Couleur de fond douce
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40", // Couleur sombre pour le texte
  },
  transactionCard: {
    backgroundColor: "#fff", // Fond blanc pour les cartes
    borderRadius: 10,
    borderColor:COLORS.primary,
    borderWidth:2,
    padding: 15,
    marginVertical: 5,
    shadowColor: "#007BFF", // Ombre
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Ombre sur Android
  },
  transactionDate: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 5,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007BFF", // Couleur bleue pour le type de transaction
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#28A745", // Couleur verte pour les revenus
  },
  transactionAmountExpense: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#DC3545", // Couleur rouge pour les dépenses
  },
  transactionDescription: {
    fontSize: 16,
    color: "#6C757D", // Couleur grise pour la description
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#E9B94E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    height: 10, // Espacement entre les cartes
  },
});
