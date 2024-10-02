import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Budget = () => {

  const budgets = [
    { id: '1', name: 'Alimentation', amount: 200, icon: 'utensils' },
    { id: '2', name: 'Transport', amount: 150, icon: 'bus' },
    { id: '3', name: 'Loisirs', amount: 100, icon: 'gamepad' },
    { id: '4', name: 'Épargne', amount: 300, icon: 'piggy-bank' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesome name={item.icon} size={24} color="#fff" />
      </View>
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAmount}>{item.amount} Franc AES</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste de Budgets</Text>
        <TouchableOpacity>
          <AntDesign name="plussquare" size={30} color="#E9B94E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={budgets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  )
}

export default Budget

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal:15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    backgroundColor: '#3f669d',
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
  },
  itemAmount: {
    fontSize: 16,
    color: '#fff',
  },
  separator: {
    height: 10,
  },
});