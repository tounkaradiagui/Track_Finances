const Transaction = require('../models/Transaction')
const Budget = require('../models/Budget');
const mongoose = require('mongoose');

const createTransaction = async (req, res) => {
    try {
        const { type, amount, description, categoryId, budgetId } = req.body;

        // Vérifier que l'utilisateur est connecté
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
        }

        // Valider les champs requis
        if (!amount) {
            return res.status(400).json({ message: "Le montant est obligatoire." });
        }
        if (!type) {
            return res.status(400).json({ message: "Veuillez choisir le type de la Transaction." });
        }
        if (!categoryId) {
            return res.status(400).json({ message: "Veuillez selectionner une catégorie." });
        }
        if (!budgetId) {
            return res.status(400).json({ message: "Veuillez choisir un budget." });
        }

        // Vérifier le budget
        const budget = await Budget.findById(budgetId);
        if (!budget) {
            return res.status(404).json({ message: "Budget non trouvé." });
        }

        // Convertir le montant en nombre
        const numericAmount = Number(amount);
        if (isNaN(numericAmount)) {
            return res.status(400).json({ message: "Le montant doit être un nombre valide." });
        }

        // Traiter les dépenses
        if (type === 'Dépense') {
            if (budget.amount < numericAmount) {
                return res.status(400).json({ message: "Le montant de la dépense dépasse le budget disponible." });
            }
            budget.amount -= numericAmount;
        } 
        
        // Traiter les revenus
        else if (type === 'Revenu') {
            budget.amount += numericAmount; // Addition numérique
        } else {
            return res.status(400).json({ message: "Type de transaction inconnu." });
        }

        // Enregistrement des modifications du budget
        await budget.save();

        // Création d'une nouvelle transaction
        const newTransaction = new Transaction({
            userId: req.user.userId,
            type,
            amount: numericAmount, // Enregistre le montant comme un nombre
            description,
            categoryId,
            budgetId,
        });

        // Enregistrer la nouvelle transaction
        await newTransaction.save();

        res.status(201).json({ message: "Transaction ajoutée avec succès", transaction: newTransaction });
    } catch (error) {
        console.error("Erreur : ", error);
        res.status(500).json({ message: "Erreur lors de l'ajout de la transaction." });
    }
};

const getTransactions = async (req, res) => {
    try {
        // Vérifier que l'utilisateur est connecté
        if(!req.user || !req.user.userId) {
            return res.status(401).json({message: 'Accès refusé. Vous devez être connecté.'});
        }
        // Trouver toutes les transactions qui appartiennent à l'utilisateur connecté
        const transactions = await Transaction.find({userId: req.user.userId});

        // Vérifier si l'utilisateur n'a pas de transactions
        if(transactions.length === 0) {
            return res.status(404).json({message: 'Aucune transaction trouvée'});
        }

        res.status(200).json({message: "Liste de transaction", transactions});
    } catch (error) {
        console.log("Erreur : ", error);
        res.status(500).json({ message: "Erreur lors de la récupération des transactions." });
    }
};

const getTransactionById = async (req, res) => {
    const { id } = req.params;

    // Vérification de la validité de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID de transaction invalide." });
    }

    try {
        // Recherche de la transaction dans la base de données
        const transaction = await Transaction.findById(id);

        // Si la transaction n'existe pas, retour d'une erreur 404
        if (!transaction) {
            return res.status(404).json({ message: "Transaction non trouvée." });
        }

        // Réponse avec la transaction trouvée
        return res.status(200).json({
            message: "Transaction trouvée.",
            transaction
        });

    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse appropriée
        console.log("Erreur lors de la récupération de la transaction : ", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la transaction." });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const {transactionId} = req.params;
        const {type, amount, description} = req.body;
        // Vérifier si l'utilisateur est connecté
        if(!req.user || !req.user.userId) {
            return res.status(401).json({message: 'Accès refusé. Vous devez etre connecté'});
        }

        // Trouver la transaction par ID et s'assurer qu'elle appartient à l'utilisateur connecté
        const transaction = await Transaction.findOne({_id: transactionId, userId: req.user.userId});
        if(!transaction) {
            return res.status(404).json({message: "Transaction non trouvée ou vous n'avez pas les droits pour la modifier."});
        }
        // Mettre à jour la transaction
        transaction.type = type;
        transaction.amount = amount;
        transaction.description = description;

        await transaction.save();

        res.status(200).json({message: "Transaction mise à jour avec succès", transaction});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la transaction"});
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const {transactionId} = req.params;
        // Vérifier si l'utilisateur est connecté
        if(!req.user || !req.user.userId) {
            res.status(200).json({message: "Accès refusé. Vous devez etre connecté"});
        }
        // Trouver la transaction par ID et s'assurer qu'elle appartient à l'utilisateur connecté
        const transaction = await Transaction.findOneAndDelete({_id: transactionId, userId: req.user.userId});
        if(!transaction) {
            return res.status(404).json({message: "Transaction non trouvée ou n'avez pas les droits pour la supprimer."});
        }
        // Supprimer la transaction
        res.status(200).json({ message: "Transaction supprimée avec succès" });
    } catch (error) {
        console.log("Erreur : ", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la transaction." });
    }
};

module.exports = {getTransactions, createTransaction, updateTransaction, deleteTransaction, getTransactionById}