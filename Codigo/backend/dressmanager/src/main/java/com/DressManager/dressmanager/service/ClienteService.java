package com.DressManager.dressmanager.service;

import java.util.List;
import java.util.Optional;

import com.DressManager.dressmanager.service.exceptions.ClienteComAlugueisException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.DressManager.dressmanager.dto.cliente.ClienteDTO;
import com.DressManager.dressmanager.model.Cliente;
import com.DressManager.dressmanager.repository.ClienteRepository;
import com.DressManager.dressmanager.repository.EnderecoRepository;

import jakarta.transaction.Transactional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public List<ClienteDTO> listar() {
        List<Cliente> clientes = clienteRepository.findAll();
        return ClienteDTO.converter(clientes);
    }

    public Page<ClienteDTO> listarPaginado(Pageable pageable) {
        Page<Cliente> clientesPage = clienteRepository.findAll(pageable);
        return clientesPage.map(ClienteDTO::new);
    }

    public ClienteDTO findById(Long id) {
        return clienteRepository.findById(id)
                .map(ClienteDTO::new)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    @Transactional
    public ClienteDTO salvar(ClienteDTO form) {
        Cliente cliente = form.toEntity();
        clienteRepository.save(cliente);
        return new ClienteDTO(cliente);
    }

    @Transactional
    public ClienteDTO atualizar(Long id, ClienteDTO form) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        form.updateCliente(cliente);
        clienteRepository.save(cliente);
        return new ClienteDTO(cliente);
    }

    @Transactional
    public void deletar(Long id) {
        Cliente cliente = findById(id).toEntity();

        if (!cliente.getAlugueis().isEmpty()) {
            throw new ClienteComAlugueisException("O usuário não pode ser deletado pois possui aluguéis relacionados.");
        }

        clienteRepository.deleteById(id);
    }
}
