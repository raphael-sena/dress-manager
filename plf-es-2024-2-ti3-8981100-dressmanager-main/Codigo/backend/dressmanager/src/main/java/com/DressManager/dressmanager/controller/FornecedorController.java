package com.DressManager.dressmanager.controller;

import com.DressManager.dressmanager.dto.fornecedor.FornecedorDTO;
import com.DressManager.dressmanager.service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    public ResponseEntity<Page<FornecedorDTO>> listar(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<FornecedorDTO> fornecedores = fornecedorService.listar(pageable);
        return ResponseEntity.ok(fornecedores);
    }
    @GetMapping("/all")
    public ResponseEntity<List<FornecedorDTO>> listarAll() {
        List<FornecedorDTO> fornecedores = fornecedorService.listarAll();
        return ResponseEntity.ok(fornecedores);
    }


    @GetMapping("/{id}")
    public ResponseEntity<FornecedorDTO> findById(@PathVariable Long id) {
        FornecedorDTO fornecedorDTO = fornecedorService.findById(id);
        return ResponseEntity.ok(fornecedorDTO);
    }

    @GetMapping("/{id}/itens")
    public ResponseEntity<FornecedorDTO> findItensByFornecedor(@PathVariable Long id) {
        FornecedorDTO fornecedorDTO = fornecedorService.findItensByFornecedor(id);
        return ResponseEntity.ok(fornecedorDTO);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Void> create(@Valid @RequestBody FornecedorDTO obj) {
        FornecedorDTO newFornecedor = fornecedorService.create(obj);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newFornecedor.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<FornecedorDTO> update(@PathVariable Long id,
                                                @Valid @RequestBody FornecedorDTO form) {
        FornecedorDTO updatedFornecedor = fornecedorService.update(id, form);
        return ResponseEntity.ok(updatedFornecedor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        fornecedorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
