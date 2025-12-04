import axios from 'axios';
import urlApi from '../../urlService';

const apiUrl = `${urlApi}` + '/usuarios';

export const createUser = async (clientData) => {
  try {
    const response = await axios.post(apiUrl, clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const getUsers = async () => {
  try {
      const response = await axios.get(apiUrl);
      console.log('response', response.data);
      return response.data;
  } catch (error) {
      console.error('Erro ao obter usuarios:', error);
      throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
      const response = await axios.put(`${apiUrl}/${userId}`, userData);
      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
      throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
      const response = await axios.delete(`${apiUrl}/${userId}`);
      return response.data;
  } catch (error) {
      console.error('Erro ao excluir usuario:', error);
      throw error;
  }
};

