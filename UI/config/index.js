const BASE_URL = 'https://track-finances.onrender.com';
// const BASE_URL = 'http://192.168.178.140:5000';


export const API_URL = {
    // ############### Public URL ########################
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
    
    // ################# Protected URL ####################
    logout: `${BASE_URL}/api/auth/logout`,

    // Gestion de Catégories
    createCategory: `${BASE_URL}/api/auth/user/category`,
    getCategories: `${BASE_URL}/api/auth/user/categories`,
    showCategory: `${BASE_URL}/api/auth/user/categories/show`,
    deleteMyCategory: `${BASE_URL}/api/auth/user/category/delete/:id`,
    
    // Gestion de Budgets
    AddBudget: `${BASE_URL}/api/auth/budget/create`,
    getBudget: `${BASE_URL}/api/auth/budget/all`,
    getBudgetById: `${BASE_URL}/api/auth/budget/show-budget`,
    deleteMyBudget: `${BASE_URL}/api/auth/budget/delete/:id`,
    
    // Gestion de Transactions
    getTransactions: `${BASE_URL}/api/auth/transactions`,
    createTransaction: `${BASE_URL}/api/auth/transaction`,
    getTransactionById: `${BASE_URL}/api/auth/transaction/show`,
    deleteMyTransaction: `${BASE_URL}/api/auth/transaction/:id`,
    
    // Gestion des Objectifs financiers
    fetchGoals: `${BASE_URL}/api/auth/goals/my-goal`,
    createGoal: `${BASE_URL}/api/auth/goals/my-goal`,
    showGoal: `${BASE_URL}/api/auth/goals/show-goal`,
    saveForGoal: `${BASE_URL}/api/auth/goals/my-goal/saving/:id`,
    deleteMyGoal: `${BASE_URL}/api/auth/goals/my-goal/:id`,
    
    // Gestion de Profil
    editUserProfile: `${BASE_URL}/api/auth/user/profile`,
    deleteAccount: `${BASE_URL}/api/auth/user/profile`,
    changePassword: `${BASE_URL}/api/auth/user/profile/change-password`,
    requestReset: `${BASE_URL}/api/auth/request-password-reset`,
    resetPassword: `${BASE_URL}/api/auth/reset-password`,
    
};
