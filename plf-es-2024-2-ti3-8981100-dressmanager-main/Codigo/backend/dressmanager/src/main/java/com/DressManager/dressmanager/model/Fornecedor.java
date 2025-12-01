package com.DressManager.dressmanager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "FORNECEDOR")
public class Fornecedor {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Valid
    @NotNull(message = "O endereço é obrigatório")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;

    @Pattern(regexp = "\\(\\d{2}\\) \\d{9}", message = "O número de telefone deve estar no formato (XX) XXXXXXXXX")
    @NotBlank(message = "O telefone é obrigatório")
    private String telefone;

    @OneToMany(mappedBy = "fornecedor")
    @JsonIgnoreProperties("fornecedor")
    private List<Item> itens = new ArrayList<>();
}
