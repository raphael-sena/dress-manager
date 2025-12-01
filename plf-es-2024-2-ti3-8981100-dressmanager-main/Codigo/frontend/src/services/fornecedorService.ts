import axios from 'axios';
import urlApi from '../../urlService';

const apiUrl = `${urlApi}` + '/fornecedores'; 

export const getFornecedores = async (page = 0, size = 5, sort = 'id,asc') => {
    try {
        const response = await axios.get(`${apiUrl}`, {
            params: {
                page,
                size,
                sort,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter fornecedores:', error);
        throw error;
    }
};

export const createFornecedor = async (fornecedorData) => {
    try {
        const response = await axios.post(apiUrl, fornecedorData, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar fornecedor:', error);
        throw error;
    }
};

export const updateFornecedor = async (fornecedorId, fornecedorData) => {
    try {
        const response = await axios.put(`${apiUrl}/${fornecedorId}`, fornecedorData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        throw error;
    }
};

export const deleteFornecedor = async (fornecedorId) => {
    try {
        const response = await axios.delete(`${apiUrl}/${fornecedorId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        throw error;
    }
};
