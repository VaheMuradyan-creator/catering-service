// API Configuration
// Uses environment variables for production, falls back to localhost for development

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
  },
  PACKAGES: `${API_BASE_URL}/api/packages`,
  MENU_ITEMS: `${API_BASE_URL}/api/menu-items`,
  ORDERS: `${API_BASE_URL}/api/orders`,
};

export default API_BASE_URL;
