package com.DressManager.dressmanager.dto.aluguel;

public record HistoricoAluguelRequestDTO(
                                         String[] nomeCliente,
                                         String nomeItem,
                                         String[] modelo,
                                         String dataInicio,
                                         String dataFim,
                                         double valorInicial,
                                         double valorFinal) {
}
