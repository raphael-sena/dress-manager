package com.DressManager.dressmanager.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.DressManager.dressmanager.model.enums.AvaliacaoClienteEnum;
import com.fasterxml.jackson.annotation.*;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CLIENTE")
public class Cliente {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String rg;

    @Valid
    @NotNull(message = "O endereço é obrigatório")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id", nullable = false)
    @JsonManagedReference
    private Endereco endereco;

    private String telefone;
    private String email;

    @JsonFormat(pattern = "dd/MM/yyyy", shape = JsonFormat.Shape.STRING)
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "avaliacao")
    private AvaliacaoClienteEnum avaliacao;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("cliente")
    private Set<Aluguel> alugueis = new HashSet<>();
}
