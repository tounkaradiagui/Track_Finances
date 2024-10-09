const BASE_URL = 'http://192.168.228.140:5000';

export const API_URL = {
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/api/auth/logout`,
    createCategory: `${BASE_URL}/api/auth/user/category`,
    getCategories: `${BASE_URL}/api/auth/user/categories`,
    getCategories: `${BASE_URL}/api/auth/user/categories`,
    AddBudget: `${BASE_URL}/api/auth/budget/create`,
    
  // Ajoute d'autres endpoints ici
  // par exemple:
  // getUser: `${BASE_URL}/api/user`,
};
