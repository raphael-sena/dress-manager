import axios from 'axios';
import { Aluguel } from './aluguelService';
import urlApi from '../../urlService';

const apiUrl = `${urlApi}` + '/ajuste'; 

export interface Ajuste {
    id: number;
    dataFim: string;
    aluguel: Aluguel;
    observacao: string;
    finalizado: boolean;
    valor: number;
}

export const getAjustes = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter ajustes:', error);
        throw error;
    }
};

export const createAjuste = async (ajusteData: string) => {
    try {
        const response = await axios.post(apiUrl, ajusteData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar ajuste:', error);
        throw error;
    }
};

export const updateAjuste = async (ajusteId: number, ajusteData: string) => {
    try {
        const response = await axios.put(`${apiUrl}/${ajusteId}`, ajusteData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar ajuste:', error);
        throw error;
    }
};

export const deleteAjuste = async (ajusteId: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/${ajusteId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir ajuste:', error);
        throw error;
    }
};
