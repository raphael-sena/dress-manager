package com.DressManager.dressmanager.dto.aluguel;

import com.DressManager.dressmanager.model.enums.StatusPagamento;

import java.time.LocalDate;

public record AluguelSemanaDTO(
        String nomeCliente,
        LocalDate dataInicio,
        LocalDate dataFim,
        double valorAluguel,
        String nomeItem,
        StatusPagamento statusPagamento
) {}
