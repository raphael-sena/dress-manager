import axios from 'axios';
import urlApi from '../../urlService';

const apiUrl = `${urlApi}` + '/clientes'; 

interface Address {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

export interface Client {
    id: string;
    nome: string;
    cpf: string;
    rg: string;
    endereco: Address;
    telefone: string;
    email: string;
    dataNascimento: string;
    avaliacao: number;
}

export const getClients = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        throw error;
    }
};

export const getPaginatedClients = async (page = 0, size = 10, sort = 'id,asc') => {
    try {
        const response = await axios.get(`${apiUrl + '/paged'}`, {
            params: {
                page,
                size,
                sort,
            },
        });
        console.log("Clientes Paginados: " + response);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter clientes paginados:', error);
        throw error;
    }
};

export const createClient = async (clientData: Client) => {
    try {
        const response = await axios.post(apiUrl, clientData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        throw error;
    }
};

export const updateClient = async (clientId: string, clientData: Client) => {
    try {
        const response = await axios.put(`${apiUrl}/${clientId}`, clientData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        throw error;
    }
};

export const deleteClient = async (clientId: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/${clientId}`);
        return response.data;
    } catch (error) {
        alert(error.message);
        console.error('Erro ao excluir cliente:', error);
        throw error;
    }
};

export const getAlugueisPorCliente = async (clienteId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${apiUrl}/${clienteId}/alugueis`);
        console.log("Aluguéis encontrados: ", response.data);
        return response.data;
    } catch (error) {
        console.error('erro ao obter alugueis do cliente:', error);
        throw error;
    }
}

export const getClienteById = async (clienteId: number) => {
    try {
        const response = await axios.get(`${apiUrl}` + '/' + `${clienteId}`);
        console.log("Cliente encontrado: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter cliente:', error);
        throw error;
    }
}
