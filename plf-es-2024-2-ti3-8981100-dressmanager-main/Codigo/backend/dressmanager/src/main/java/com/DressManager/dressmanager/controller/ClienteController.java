package com.DressManager.dressmanager.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.DressManager.dressmanager.model.Aluguel;
import com.DressManager.dressmanager.service.AluguelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.DressManager.dressmanager.dto.cliente.ClienteDTO;
import com.DressManager.dressmanager.service.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private AluguelService aluguelService;

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listar() {
        List<ClienteDTO> clientes = clienteService.listar();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{clienteId}/alugueis")
    public ResponseEntity<List<Aluguel>> listarAlugueisPorCliente(@PathVariable Long clienteId) {
        List<Aluguel> alugueis = aluguelService.findAllByCliente(clienteId);

        if (alugueis.isEmpty()) {
            System.out.println("entrou");
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(alugueis);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<ClienteDTO>> listarPaginado(@RequestParam(value = "page", defaultValue = "0") int page,
                                                           @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClienteDTO> clientes = clienteService.listarPaginado(pageable);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> findById(@PathVariable Long id) {
        ClienteDTO cliente = clienteService.findById(id);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody ClienteDTO obj) {
        ClienteDTO newCliente = clienteService.salvar(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newCliente.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ClienteDTO form) {
        ClienteDTO clienteAtualizado = clienteService.atualizar(id, form);
        return ResponseEntity.ok(clienteAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
