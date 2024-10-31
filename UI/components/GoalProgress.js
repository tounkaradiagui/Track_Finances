import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import * as Progress from 'react-native-progress'

const GoalProgress = ({goal}) => {
    const [progress, setProgress] = useState(0);

    const calculateProgress = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const {currentSaved, targetAmount} = goal;
        const progressPercentage = (currentSaved / targetAmount) * 100;
        setProgress(progressPercentage);
    }
    useEffect(() => {
        calculateProgress();
    }, {goal})

  return (
    <View style ={styles.container}>
      <Text style ={styles.goalName}>{goal.name}</Text>
      <Progress.Bar progress={progress / 100} width={300} color="#4caf50"/>
      <Text>{`${progress.toFixed(1)}%`}</Text>
      <Text>{`Epargne: $${goal.currentSaved} / $${goal.targetAmount}}`}</Text>
    </View>
  )
}

export default GoalProgress

const styles = StyleSheet.create({
    container: {
        margin:10,
        padding:10,
        backgroundColor: "#fff",
        borderRadius:5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        ShadowRadius:10,
        elevation:2
    },
    goalName: {
        fontSize:18,
        fontWeight: 'bold',
        marginBottom: 10
    }
})