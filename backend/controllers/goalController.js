const express = require("express");
const Goal = require("../models/Goal.js");
const mongoose = require("mongoose");

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
  const { id } = req.params; // L'ID de l'objectif est maintenant dans les paramètres
  const { amount } = req.body;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ message: "Aucun objectif trouvé !" });
    }

    // Convertir le montant en nombre
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({ message: "Le montant doit être un nombre valide." });
    }

    // Vérifier si le montant total dépasse le montant ciblé:
    if (goal.currentSaved + numericAmount > goal.targetAmount) {
      return res.status(400).json({ message: "Le montant total ne peut pas dépasserait l'objectif de"});
    }

    goal.currentSaved += numericAmount;
    await goal.save();
    return res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur d'ajout de votre épargne !" });
  }
};
// Trouver les objectifs financiers de chaque utilisateur
const getGoals = async (req, res) => {
  const { userId } = req.params;
  try {
    const goals = await Goal.find({ userId });
    if(!goals) {
      return res.status(404).json({ message: "Aucun objectif trouvé !" });
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
    return res
      .status(500)
      .json({ message: "Erreur de calcul de la progression" });
  }
};

const showSingleGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ message: "Aucun objectif trouvé" });
    }
    return res.status(200).json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error); // Log l'erreur
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  // Vérifier si l'ID fourni par user est valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  try {
    const goal = await Goal.findByIdAndDelete(id);
    if (!goal) {
      return res.status(404).json({ message: "Aucun objectif trouvé !" });
    }
    return res.status(200).json({ message: "Objectif supprimé avec succès"});
  } catch (error) {
    console.log("Error deleting goal:", error); // Log l'erreur
    return res.status(500).json({ message: "Erreur de serveur" });
  }
};


module.exports = { newGoal, saveForGoal, getGoals, checkProgress, showSingleGoal, deleteGoal };
