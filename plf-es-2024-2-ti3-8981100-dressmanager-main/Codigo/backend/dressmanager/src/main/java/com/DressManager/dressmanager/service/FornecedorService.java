package com.DressManager.dressmanager.service;

import com.DressManager.dressmanager.dto.fornecedor.FornecedorDTO;
import com.DressManager.dressmanager.model.Fornecedor;
import com.DressManager.dressmanager.repository.FornecedorRepository;
import com.DressManager.dressmanager.service.exceptions.ObjectNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    public Page<FornecedorDTO> listar(Pageable pageable) {
        Page<Fornecedor> fornecedores = fornecedorRepository.findAll(pageable);
        return fornecedores.map(FornecedorDTO::new);
    }

    public List<FornecedorDTO> listarAll() {
        List<Fornecedor>fornecedores = fornecedorRepository.findAll();
        return FornecedorDTO.converter(fornecedores);
    }

    public FornecedorDTO findById(Long id) {
        return fornecedorRepository.findById(id)
                .map(FornecedorDTO::new)
                .orElseThrow(() -> new ObjectNotFoundException("Fornecedor não encontrado"));
    }

    @Transactional
    public FornecedorDTO create(FornecedorDTO form) {
        Fornecedor fornecedor = form.toEntity();
        fornecedorRepository.save(fornecedor);
        return new FornecedorDTO(fornecedor);
    }

    @Transactional
    public FornecedorDTO update(Long id, FornecedorDTO form) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrado"));
        form.updateFornecedor(fornecedor);
        fornecedorRepository.save(fornecedor);
        return new FornecedorDTO(fornecedor);
    }

    @Transactional
    public void delete(Long id) {
        Fornecedor fornecedor = fornecedorRepository
                .findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrado"));
        fornecedorRepository.deleteById(id);
    }

    public FornecedorDTO findItensByFornecedor(Long id) {
        Optional<Fornecedor> fornecedorOpt = fornecedorRepository.findById(id);

        findById(fornecedorOpt.get().getId());

        Fornecedor fornecedor = fornecedorOpt.get();

        return new FornecedorDTO(fornecedor);
    }
}
