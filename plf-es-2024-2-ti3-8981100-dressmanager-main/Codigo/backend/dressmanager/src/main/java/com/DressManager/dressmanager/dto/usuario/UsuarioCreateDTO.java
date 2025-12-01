package com.DressManager.dressmanager.dto.usuario;

import com.DressManager.dressmanager.dto.endereco.EnderecoDTO;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioCreateDTO {

    @NotBlank
    @Size(min = 2, max = 100)
    @Email(message = "O email deve ser válido")
    private String email;

    @Size(min = 8, max = 60)
    @NotBlank(message = "A senha é obrigatória")
    private String senha;

    @Size(min = 5, max = 200)
    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @Pattern(regexp = "\\(\\d{2}\\) \\d{9}", message = "O número de telefone deve estar no formato (XX) XXXXXXXXX")
    @NotBlank(message = "O telefone é obrigatório")
    private String telefone;

    @NotBlank
    private String role;
}
