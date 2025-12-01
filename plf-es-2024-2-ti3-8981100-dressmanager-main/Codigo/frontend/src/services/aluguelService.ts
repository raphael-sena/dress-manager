import axios from 'axios';
import { Item } from './itemService';
import { Client } from './clienteService';
import urlApi from '../../urlService';

const apiUrl = `${urlApi}` + '/aluguel'; 

export enum StatusPagamento {
    PENDENTE,
    PAGO
}

export interface Aluguel {
    id?: number;
    cliente: Client;
    item: Item;
    dataInicio: string;
    dataFim: string;
    statusPagamento: StatusPagamento;
    dataDevolucao: string;
    devolvido: boolean;
    finalizado: boolean;
}

export const getAlugueis = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter alugueis:', error);
        throw error;
    }
};

export const createAluguel = async (aluguelData: Aluguel) => {
    try {
        const response = await axios.post(apiUrl, aluguelData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar aluguel:', error);
        throw error;
    }
};
export const ExportPDF = async (aluguelData: Aluguel) => {
    try {
        const response = await axios.get(`${apiUrl}/download`, {
            params: {
                ...aluguelData,
                cliente: aluguelData.cliente.id,
                item: aluguelData.item.id,
                statusPagamento: aluguelData.statusPagamento
            },
            responseType: "arraybuffer",
        });
        const url = URL.createObjectURL(new Blob([Buffer.from(response.data)], {
             type: "application/pdf"}))

             const link = document.createElement('a'); 
             link.href = url; 
             link.download = 'aluguel.pdf'; 
             document.body.appendChild(link); // Simula um clique no link para iniciar o download 
             link.click(); // Remove o link após o download 
             document.body.removeChild(link); 
        return url
    } catch (error) {
        console.error('Erro ao emitir contrato do aluguel:', error);
        throw error;
    }
};

export const updateAluguel = async (aluguelId: number, aluguelData: Aluguel) => {
    try {
        const response = await axios.put(`${apiUrl}/${aluguelId}`, aluguelData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar aluguel:', error);
        throw error;
    }
};

export const deleteAluguel = async (aluguelId: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/${aluguelId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir aluguel:', error);
        throw error;
    }
};

export const devolverAluguel = async (aluguelId: number) => {
    try {
        const response = await axios.patch(`${apiUrl}/${aluguelId}/devolver`);
        return response.data;
    } catch (error) {
        console.error('Erro ao devolver aluguel:', error);
        throw error;
    }
} 

export const finalizarAluguel = async (aluguelId: number) => {
    try {
        const response = await axios.patch(`${apiUrl}/${aluguelId}/finalizar`);
        return response.data;
    } catch (error) {
        console.error('Erro ao finalizar aluguel:', error);
        throw error;
    }
}

export const getAlugueisAtrasados = async () => {
    try {
        const response = await axios.get(`${apiUrl}/atrasados`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter alugueis:', error);
        throw error;
    }
};

export const getAlugueisProximosDeDevolucao = async () => {
    try {
        const response = await axios.get(`${apiUrl}/proximos-de-devolucao`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter alugueis:', error);
        throw error;
    }
};
