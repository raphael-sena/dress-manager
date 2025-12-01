import axios from "axios";
import { HistoricoAluguelRequest, HistoricoAluguelResponse } from "../Models/HistoricoAluguel";
import urlApi from "../../urlService";

// Função para buscar o histórico de aluguel
export const fetchHistoricoAluguel = async (
  requestData: HistoricoAluguelRequest
): Promise<HistoricoAluguelResponse> => {
  try {
    const response = await axios.post<HistoricoAluguelResponse>(
      `${urlApi}` + "/aluguel/historico", // Corrigido para incluir o protocolo e a porta corretos
      requestData
    );
    return response.data;
  } catch (error) {
    // Tratamento de erros para melhorar o rastreamento e os logs
    if (axios.isAxiosError(error)) {
      console.error("Erro de API:", error.response?.data || error.message);
      throw new Error("Erro ao buscar o histórico de aluguel. Verifique os dados e tente novamente.");
    } else {
      console.error("Erro desconhecido:", error);
      throw new Error("Ocorreu um erro desconhecido. Tente novamente.");
    }
  }
};
