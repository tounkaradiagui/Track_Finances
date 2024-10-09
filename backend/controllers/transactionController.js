const Transaction = require('../models/Transaction')


const createTransaction = async (req, res) => {
    try {
        const { type, amount, description } = req.body; // Récupérer les données de la requête

        // Vérifier que l'utilisateur est connecté
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
        }

        // Créer une nouvelle transaction
        const newTransaction = new Transaction({
            userId: req.user.userId, // Associer la transaction à l'utilisateur connecté
            type,
            amount,
            description,
        });

        // Enregistrer la nouvelle transaction
        await newTransaction.save();

        res.status(201).json({ message: "Transaction ajoutée avec succès", transaction: newTransaction });
    } catch (error) {
        console.log("Erreur : ", error);
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

module.exports = {getTransactions, createTransaction, updateTransaction, deleteTransaction}