package com.DressManager.dressmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A rua é obrigatória")
    @Size(max = 255, message = "A rua não pode ter mais que 255 caracteres")
    private String rua;

    @NotBlank(message = "O número é obrigatório")
    @Size(max = 10, message = "O número não pode ter mais que 10 caracteres")
    private String numero;

    @Nullable
    private String complemento;

    @NotBlank(message = "O bairro é obrigatório")
    private String bairro;

    @NotBlank(message = "A cidade é obrigatória")
    private String cidade;

    @NotBlank(message = "O estado é obrigatório")
    @Size(max = 2, message = "O estado deve conter 2 caracteres")
    private String estado;

    @Pattern(regexp = "\\d{5}-\\d{3}|\\d{8}", message = "O CEP deve estar no formato XXXXX-XXX ou XXXXXXXX")
    @NotBlank(message = "O CEP é obrigatório")
    private String cep;

    @OneToOne(mappedBy = "endereco")
    @JsonBackReference
    private Cliente cliente;
}
