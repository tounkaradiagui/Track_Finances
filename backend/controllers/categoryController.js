const Category = require('../models/Category');

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body; // Ne pas extraire userId ici

        // Vérifier si l'utilisateur est connecté
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Vous n'êtes pas autorisé à effectuer cette opération. Veuillez vous connecter !" });
        }
        console.log("Utilisateur connecté : ", req.user);

        // Vérifier si le nom de la catégorie est déjà pris
        const existingCategory = await Category.findOne({ name, userId: req.user.userId });
        if (existingCategory) {
            return res.status(400).json({ message: "Ce nom de catégorie est déjà utilisé." });
        }

        // Vérifier si les champs requis sont présents
        if (!name) {
            return res.status(400).json({ message: "Le nom de la catégorie est obligatoire" });
        }

        // Créer la catégorie
        const category = new Category({ name, description, userId: req.user.userId });
        await category.save();

        return res.status(201).json({ message: 'Catégorie créée avec succès', category });
    } catch (error) {
        console.error("Erreur: ", error);
        return res.status(500).json({ message: 'Erreur lors de la création de la catégorie', error });
    }
};

const getCategories = async (req, res) => {
    try {
        // Vérifier que l'utilisateur est connecté
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
        }

        // Trouver toutes les catégories qui appartiennent à l'utilisateur connecté
        const categories = await Category.find({ userId: req.user.userId });

        // Vérifier si l'utilisateur n'a pas de catégories
        if (categories.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie disponible." });
        }

        // Retourner les catégories
        res.status(200).json({ categories });
    } catch (error) {
        console.log("Erreur : ", error);
        res.status(500).json({ message: "Erreur lors de la récupération des catégories." });
    }
};



const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // Récupérer l'ID de la catégorie à partir des paramètres de la requête
        const { name, description } = req.body; // Récupérer les nouvelles valeurs à partir du corps de la requête

        // Vérifier que l'utilisateur est connecté
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
        }

        // Trouver la catégorie par ID et s'assurer qu'elle appartient à l'utilisateur connecté
        const category = await Category.findOne({ _id: categoryId, userId: req.user.userId });
        
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée ou vous n'avez pas les droits pour la modifier." });
        }

        // Mettre à jour la catégorie avec les nouvelles valeurs
        category.name = name || category.name; // Conserve l'ancienne valeur si aucune nouvelle valeur n'est fournie
        category.description = description || category.description;

        // Enregistrer les modifications
        await category.save();

        res.status(200).json({ message: "Catégorie mise à jour avec succès", category });
    } catch (error) {
        console.log("Erreur : ", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie." });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // Récupérer l'ID de la catégorie à partir des paramètres de la requête

        // Vérifier que l'utilisateur est connecté
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
        }

        // Trouver la catégorie par ID et s'assurer qu'elle appartient à l'utilisateur connecté
        const category = await Category.findOneAndDelete({ _id: categoryId, userId: req.user.userId });
        
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée ou vous n'avez pas les droits pour la supprimer." });
        }

        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        console.log("Erreur : ", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la catégorie." });
    }
};


module.exports = {getCategories, addCategory, updateCategory, deleteCategory}        