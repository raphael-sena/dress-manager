package com.DressManager.dressmanager.controller;

import java.io.IOException;
import java.util.List;

import com.DressManager.dressmanager.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.DressManager.dressmanager.dto.item.CreateItemDTO;
import com.DressManager.dressmanager.dto.item.DetailItemDTO;
import com.DressManager.dressmanager.dto.item.ItemDTO;
import com.DressManager.dressmanager.dto.item.UpdateItemDTO;
import com.DressManager.dressmanager.service.ItemService;

@RestController
@RequestMapping("/itens")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<Page<ItemDTO>> listar(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of( page, size);
        Page<ItemDTO> itens = itemService.listar(pageable);
        return ResponseEntity.ok(itens);
    }

    @GetMapping("/all")
    public List<ItemDTO> listarTodos() {
        return itemService.listarTodos();
    }

    @GetMapping("/modelos")
    public List<String> ListaModelos() {
        return itemService.listarModelos();
    }

    @PostMapping
    public ItemDTO salvar(@RequestBody CreateItemDTO form,
                          JwtAuthenticationToken token) {
        return itemService.salvar(form);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> findById(@PathVariable Long id) {
        ItemDTO itemDTO = itemService.findById(id);
        return ResponseEntity.ok(itemDTO);
    }

    @PutMapping("/{id}")
    public DetailItemDTO atualizar(@PathVariable Long id, @RequestBody UpdateItemDTO form) {
        return itemService.atualizar(id, form);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        itemService.deletar(id);
    }

    @PostMapping("/{id}/imagem")
    public ResponseEntity<?> uploadImagem(@PathVariable Long id, @RequestParam("imagem") MultipartFile file) {
        try {
            itemService.salvarImagem(id, file);
            return ResponseEntity.ok().body("Imagem salva com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> getImagem(@PathVariable Long id) {
        byte[] imagem = itemService.recuperarImagem(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) 
                .body(imagem);
    }

    
}
