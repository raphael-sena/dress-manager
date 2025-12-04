import axios from 'axios';
import urlApi from '../../urlService';

const apiUrl = `${urlApi}` + '/itens'; 

export interface Item {
    id: number;
    descricao: string;
    modelo: string;
    quantidade: number;
    valorVenda: number;
    valorAluguel: number;
    observacao: string;
}

export const getItens = async () => {
    try {
        const response = await axios.get(apiUrl + '/all');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter itens:', error);
        throw error;
    }
};
