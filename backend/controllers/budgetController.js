const Budget = require('../models/Budget');
const User = require('../models/User');


const createBudget = async (req, res) => {
    try {
        const {userId, categoryId, period, amount, description} = req.body;

        // Vérifier si l'utilisateur existe:
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({message: "Utilisateur non trouvé"});
        }

        // vérifier si l'utilisateur est connecté:
        if(!req.user || !req.user.userId) {
            return res.status(401).json({message: "Vous devez être connecté pour ajouter un budget"});
        }

        const newBudget = new Budget({
            categoryId: categoryId,
            userId: req.user.userId,
            description: description,
            period: period,
            amount: amount
        });

        await newBudget.save();
        res.status(200).json({message: "Budget créer avec succès !", newBudget});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: "Erreur de serveur"});
    }
};

const getBudgets = async (req, res) => {
    try {

        // vérifier si l'utilisateur est connecté:
        if(!req.user || !req.user.userId) {
            return res.status(401).json({message: "Vous devez être connecté pour afficher vos budgets"});
        }

        // Trouver tous les budget qui appartiennent à l'utilisateur connecté
        const budget = await Budget.find({ userId: req.user.userId });
        if(!budget) {
            res.status(404).json({message: "Aucun budget trouvé"});
        }

        res.status(200).json({message: "Liste de vos budget", budget});
        
        // Trouver le budget par Id et s'assurer qu'elle appartienne à l'utilisateur connecté
        // const budget = await Budget.findById(budgetId, {userId: req.user.userId, })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erreur de serveur"});
    }
};

const updateBudget = async (req, res) => {
    try {
        const {budgetId} = req.params;

        // Vérifier que l'utilisateur est connecté
        if(!req.user || !req.user.userId) {
            return res.status(401).json({message: "Vous devez être connecté pour modifier votre budget"});
        }

        // Trouver le budget par Id et s'assurer qu'elle appartienne à l'utilisateur connecté
        const budget = await Budget.findOne({_id: budgetId, userId:req.user.userId});
        if(!budget) {
            return res.status(404).json({message: "Budget non trouvé"});
        }

        // mettre à jour le budget:
        const updatedBudget = await Budget.findByIdAndUpdate(budgetId, req.body, {new: true});
        res.status(200).json({message: "Budget mis à jour avec succès !", updatedBudget});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erreur de serveur"});   
    }
};

const deleteBudget = async (req, res) => {
    try {
        const {budgetId} = req.params;

        // Vérifier que l'utilisateur est connecté
        if(!req.user || !req.user.userId) {
            return res.status(401).json({message: "Vous devez être connecté pour modifier votre budget"});
        }

        // Trouver le budget par Id et s'assurer qu'elle appartienne à l'utilisateur connecté
        const budget = await Budget.findOne({_id: budgetId, userId:req.user.userId});
        if(!budget) {
            return res.status(404).json({message: "Budget non trouvé"});
        }

        // Supprimer le budget
        await Budget.findByIdAndDelete(budgetId);
        res.status(200).json({message: "Budget supprimé avec succès !"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erreur de serveur"});      
    }
};

module.exports = {createBudget, getBudgets, updateBudget, deleteBudget};