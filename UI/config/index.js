// const BASE_URL = 'https://track-finances.onrender.com';
const BASE_URL = 'http://192.168.99.140:5000';

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

<<<<<<< HEAD
    editUserProfile: `${BASE_URL}/api/auth/user/profile/${userId}`
    
=======
    editUserProfile: `${BASE_URL}/api/auth/user/profile`
>>>>>>> master
};
