package com.DressManager.dressmanager.model;

import java.time.LocalDate;

import com.DressManager.dressmanager.model.enums.StatusPagamento;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Aluguel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate dataInicio;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate dataFim;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonIgnoreProperties("alugueis")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Enumerated(EnumType.STRING) // Salva o valor do enum como texto no banco de dados
    @NotNull
    @Column(name = "status_pagamento")
    private StatusPagamento statusPagamento;

    @Nullable
    private LocalDate dataDevolucao;

    @Column(name = "devolvido")
    private boolean devolvido;

    @Column(name = "finalizado")
    private boolean finalizado;
}
