package com.DressManager.dressmanager.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.DressManager.dressmanager.dto.fornecedor.FornecedorDTO;
import com.DressManager.dressmanager.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.DressManager.dressmanager.dto.item.CreateItemDTO;
import com.DressManager.dressmanager.dto.item.DetailItemDTO;
import com.DressManager.dressmanager.dto.item.ItemDTO;
import com.DressManager.dressmanager.dto.item.UpdateItemDTO;
import com.DressManager.dressmanager.model.Item;
import com.DressManager.dressmanager.repository.ItemRepository;

import jakarta.transaction.Transactional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Page<ItemDTO> listar(Pageable pageable) {
        Page<Item> itens = itemRepository.findAll(pageable); // Busca paginada
        return itens.map(ItemDTO::new); // Converte os itens para DTO
    }

    public List<ItemDTO> listarTodos() {
        List<Item> itens = itemRepository.findAll();
        return ItemDTO.converter(itens);
    }

    public ItemDTO findById(Long id) {
        return itemRepository.findById(id)
                .map(ItemDTO::new)
                .orElseThrow(() -> new ObjectNotFoundException("Item não encontrado"));
    }

    @Transactional
    public ItemDTO salvar(CreateItemDTO form) {
        Item item = form.converter();
        itemRepository.save(item);
        return new ItemDTO(item);
    }
    

    @Transactional
    public DetailItemDTO atualizar(Long id, UpdateItemDTO form) {
        Optional<Item> optItem = itemRepository.findById(id);
        if (optItem.isPresent()) {
            Item item = optItem.get();
            form.updateItem(item);
            itemRepository.save(item);
            return new DetailItemDTO(item);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado");
    }

    @Transactional
    public void deletar(Long id) {
        Optional<Item> optItem = itemRepository.findById(id);
        if (optItem.isPresent()) {
            itemRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado");
        }
    }

    public List<String> listarModelos() {
        return itemRepository.findModelos();
    }

    @Transactional
    public void salvarImagem(Long id, MultipartFile file) throws IOException {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado."));
        item.setImagem(file.getBytes());
        itemRepository.save(item);
    }
    
    @Transactional
    public byte[] recuperarImagem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado."));
        return item.getImagem();
    }
}
