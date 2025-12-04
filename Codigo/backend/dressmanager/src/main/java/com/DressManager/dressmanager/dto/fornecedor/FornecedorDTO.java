package com.DressManager.dressmanager.dto.fornecedor;

import com.DressManager.dressmanager.dto.item.ItemDTO;
import com.DressManager.dressmanager.model.Endereco;
import com.DressManager.dressmanager.model.Fornecedor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FornecedorDTO {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5, max = 200)
    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @Valid
    @NotNull(message = "O endereço é obrigatório")
    private Endereco endereco;

    @Pattern(regexp = "\\(\\d{2}\\) \\d{9}", message = "O número de telefone deve estar no formato (XX) XXXXXXXXX")
    @NotBlank(message = "O telefone é obrigatório")
    private String telefone;

    private List<ItemDTO> itens;

    public FornecedorDTO(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nome = fornecedor.getNome();
        this.endereco = fornecedor.getEndereco();
        this.telefone = fornecedor.getTelefone();
        this.itens = fornecedor.getItens().stream()
                .map(ItemDTO::new)
                .collect(Collectors.toList());
    }

    public Fornecedor toEntity() {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setId(this.id);
        fornecedor.setNome(this.nome);
        fornecedor.setTelefone(this.telefone);

        Endereco endereco = new Endereco();
        endereco.setRua(this.getEndereco().getRua());
        endereco.setNumero(this.getEndereco().getNumero());
        endereco.setComplemento(this.getEndereco().getComplemento());
        endereco.setBairro(this.getEndereco().getBairro());
        endereco.setCidade(this.getEndereco().getCidade());
        endereco.setEstado(this.getEndereco().getEstado());
        endereco.setCep(this.getEndereco().getCep());

        fornecedor.setEndereco(endereco);

        return fornecedor;
    }

    public static List<FornecedorDTO> converter(List<Fornecedor> fornecedores) {
        return fornecedores.stream()
                .map(FornecedorDTO::new)
                .collect(Collectors.toList());
    }

    public void updateFornecedor(Fornecedor fornecedor) {
        fornecedor.setNome(this.nome);
        fornecedor.setEndereco(this.endereco);
        fornecedor.setTelefone(this.telefone);
    }
}
