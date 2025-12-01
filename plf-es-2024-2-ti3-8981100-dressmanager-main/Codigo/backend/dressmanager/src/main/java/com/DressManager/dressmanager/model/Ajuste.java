package com.DressManager.dressmanager.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class Ajuste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate dataFim;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "aluguel_id", nullable = true)
    private Aluguel aluguel;

    private String observacao;

    private boolean finalizado;

    private Double valor;

    private void concluirAjuste(){
        this.finalizado = true;
    }

}