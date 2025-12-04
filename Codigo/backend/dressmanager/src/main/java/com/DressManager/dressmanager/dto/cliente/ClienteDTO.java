package com.DressManager.dressmanager.dto.cliente;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.DressManager.dressmanager.model.enums.AvaliacaoClienteEnum;
import lombok.*;
import com.DressManager.dressmanager.model.Cliente;
import com.DressManager.dressmanager.model.Endereco;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String rg;

    @Valid
    @NotNull(message = "O endereço é obrigatório")
    private Endereco endereco;

    private String telefone;
    private String email;
    private LocalDate dataNascimento;

    private AvaliacaoClienteEnum avaliacao;

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.cpf = cliente.getCpf();
        this.rg = cliente.getRg();
        this.endereco = cliente.getEndereco();
        this.telefone = cliente.getTelefone();
        this.email = cliente.getEmail();
        this.dataNascimento = cliente.getDataNascimento();
        this.avaliacao = cliente.getAvaliacao();
    }

    public Cliente toEntity() {
        Cliente cliente = new Cliente();
        cliente.setId(this.id);
        cliente.setNome(this.nome);
        cliente.setCpf(this.cpf);
        cliente.setRg(this.rg);
        cliente.setTelefone(this.telefone);
        cliente.setEmail(this.email);
        cliente.setDataNascimento(this.dataNascimento);
        cliente.setAvaliacao(this.avaliacao);

        Endereco endereco = new Endereco();
        endereco.setRua(this.getEndereco().getRua());
        endereco.setNumero(this.getEndereco().getNumero());
        endereco.setComplemento(this.getEndereco().getComplemento());
        endereco.setBairro(this.getEndereco().getBairro());
        endereco.setCidade(this.getEndereco().getCidade());
        endereco.setEstado(this.getEndereco().getEstado());
        endereco.setCep(this.getEndereco().getCep());

        cliente.setEndereco(endereco);

        return cliente;
    }

    public static List<ClienteDTO> converter(List<Cliente> clientes) {
        return clientes.stream().map(ClienteDTO::new).collect(Collectors.toList());
    }

    public void updateCliente(Cliente cliente) {
        cliente.setNome(this.nome);
        cliente.setCpf(this.cpf);
        cliente.setRg(this.rg);
        cliente.setEndereco(this.endereco);
        cliente.setTelefone(this.telefone);
        cliente.setEmail(this.email);
        cliente.setDataNascimento(this.dataNascimento);
        cliente.setAvaliacao(this.avaliacao);
    }
}
