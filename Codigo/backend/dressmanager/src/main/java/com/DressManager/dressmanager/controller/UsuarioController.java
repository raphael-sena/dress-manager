package com.DressManager.dressmanager.controller;

import com.DressManager.dressmanager.dto.usuario.UsuarioCreateDTO;
import com.DressManager.dressmanager.model.Usuario;
import com.DressManager.dressmanager.repository.RoleRepository;
import com.DressManager.dressmanager.service.UsuarioService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
@Validated
public class UsuarioController {

    private  UsuarioService usuarioService;
    private  RoleRepository roleRepository;
    private  BCryptPasswordEncoder passwordEncoder;


    public UsuarioController(UsuarioService usuarioService,
                             RoleRepository roleRepository,
                             BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> usuarios = this.usuarioService.findAll();
        return ResponseEntity.ok().body(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id) {
        Usuario obj = this.usuarioService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @Transactional
    @PostMapping
   @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> create(@Valid @RequestBody UsuarioCreateDTO obj) {
        System.out.println(obj);
        var userFromDb = usuarioService.findByEmail(obj.getEmail());
        if (userFromDb.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        var role = roleRepository.findByName(obj.getRole());
        System.out.println(role);
        var user = new Usuario();
        user.setNome(obj.getNome());
        user.setEmail(obj.getEmail());
        user.setSenha(passwordEncoder.encode(obj.getSenha()));
        user.setTelefone(obj.getTelefone());
        user.setRoles(Set.of(role));
        usuarioService.save(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(user.getUserId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = usuarioService.update(id, usuario);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
