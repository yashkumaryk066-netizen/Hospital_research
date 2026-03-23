import client from './client';

export const login = async (email, password) => {
  try {
    const response = await client.post('login/', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Authentication Failed. Check HMS credentials.';
  }
};
