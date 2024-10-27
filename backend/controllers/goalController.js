const express = require("express");
const Goal = require("../models/Goal.js");

// Définir un objectif financier
const newGoal = async (req, res) => {
  const { name, targetAmount, deadline, frequency, userId } = req.body;
  try {
    const goal = new Goal({
      name,
      targetAmount,
      deadline,
      frequency,
      userId,
    });
    await goal.save();
    return res.status(200).json(goal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating goal" });
  }
};

// Epargner pour un objectif spécifique
const saveForGoal = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ message: "Aucun objectif trouvé !" });
        }
        
        goal.currentSaved += amount;
        await goal.save();
        return res.status(200).json(goal);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Erreur d'ajout de votre épargne !"})     
    }
};

// Trouver les objectifs financiers de chaque utilisateur
const getGoals = async (req, res) => {
    const { userId } = req.params;
    try {
        const goals = await Goal.find({ userId });
        if(!goals) {
            return res.status(404).json({ message: "Aucun objectif trouvé !"});
        }
        return res.status(200).json(goals);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching goals" });        
    }
};

// Verifier la progression de l'epargne de user par rapport à un objectif financier
const checkProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ message: "Aucun objectif trouvé !" });
        }

        const progress = (goal.currentSaved / goal.targetAmount) * 100;
        return res.status(200).json({ progress });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur de calcul de la progression" });        
    }
}

module.exports = {newGoal, saveForGoal, getGoals, checkProgress};
