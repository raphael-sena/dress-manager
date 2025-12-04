package com.DressManager.dressmanager.dto.aluguel;

public record HistoricoAluguelResponseDTO(String nomeCliente,
                                          String emailCliente,
                                          String nomeItem,
                                          String dataInicio,
                                          String dataFim,
                                          double valorAluguel,
                                          String cor) {
}
