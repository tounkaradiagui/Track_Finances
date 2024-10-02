import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';

const Transaction = () => {

  const initialTransactions = [
    { id: '1', type: 'Dépense', amount: 50, description: 'Courses' },
    { id: '2', type: 'Dépense', amount: 15, description: 'Transport' },
    { id: '3', type: 'Revenu', amount: 300, description: 'Salaire' },
    { id: '4', type: 'Dépense', amount: 20, description: 'Loisirs' },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);

  const addTransaction = () => {
    Alert.prompt(
      'Ajouter une Transaction',
      'Entrez le type, le montant et la description (ex: Dépense, 50, Courses)',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Ajouter',
          onPress: (text) => {
            const [type, amountStr, description] = text.split(',');
            const amount = parseFloat(amountStr);
            if (type && description && !isNaN(amount)) {
              const newTransaction = {
                id: (transactions.length + 1).toString(),
                type: type.trim(),
                amount,
                description: description.trim(),
              };
              setTransactions([...transactions, newTransaction]);
            } else {
              Alert.alert('Erreur', 'Veuillez entrer un type, un montant et une description valides.');
            }
          },
        },
      ],
      'plain-text'
    );
  };


  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionType}>{item.type}</Text>
      <Text style={styles.transactionAmount}>€{item.amount}</Text>
      <Text style={styles.transactionDescription}>{item.description}</Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste de transaction</Text>
        <TouchableOpacity>
          <AntDesign name="plussquare" size={30} color="#E9B94E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  )
}

export default Transaction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Pour espacer le bouton et le texte
    marginBottom: 20,
    marginHorizontal:15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  transactionCard: {
    flexDirection: 'column',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  transactionType: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#fff',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#fff',
  },
  separator: {
    height: 10,
  },
});