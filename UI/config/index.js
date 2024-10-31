const BASE_URL = 'https://track-finances.onrender.com';
// const BASE_URL = 'http://192.168.110.140:5000';


export const API_URL = {
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/api/auth/logout`,

    createCategory: `${BASE_URL}/api/auth/user/category`,
    getCategories: `${BASE_URL}/api/auth/user/categories`,

    AddBudget: `${BASE_URL}/api/auth/budget/create`,
    getBudget: `${BASE_URL}/api/auth/budget/all`,
    
    getTransactions: `${BASE_URL}/api/auth/transactions`,
    createTransaction: `${BASE_URL}/api/auth/transaction`,

    editUserProfile: `${BASE_URL}/api/auth/user/profile`,

    deleteAccount: `${BASE_URL}/api/auth/user/profile`,

    changePassword: `${BASE_URL}/api/auth/user/profile/change-password`,

    requestReset: `${BASE_URL}/api/auth/request-password-reset`,
    resetPassword: `${BASE_URL}/api/auth/reset-password`,

    fetchGoals: `${BASE_URL}/api/auth/goals/my-goal`,
    createGoal: `${BASE_URL}/api/auth/goals/my-goal`,
    showGoal: `${BASE_URL}/api/auth/goals/show-goal`,
    saveForGoal: `${BASE_URL}/api/auth/goals/my-goal/saving/:id`,
};
