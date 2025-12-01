package com.DressManager.dressmanager.model;

import com.DressManager.dressmanager.dto.LoginRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = Usuario.TABLE_NAME)
public class Usuario {

    public static final String TABLE_NAME = "USUARIO";

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "nome", length = 200, nullable = false)
    @Size(min = 5, max = 200)
    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "senha", length = 60, nullable = false)
    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 8, max = 60)
    private String senha;

    @Email(message = "O email deve ser válido")
    @NotBlank(message = "O email é obrigatório")
    private String email;

    @Pattern(regexp = "\\(\\d{2}\\) \\d{9}", message = "O número de telefone deve estar no formato (XX) XXXXXXXXX")
    @NotBlank(message = "O telefone é obrigatório")
    private String telefone;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(loginRequest.password(), this.senha);
    }


}
