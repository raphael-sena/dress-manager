package com.DressManager.dressmanager.service;

import com.DressManager.dressmanager.model.Usuario;
import com.DressManager.dressmanager.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);

    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setSenha(usuario.getSenha()); // Certifique-se de criptografar a senha
        usuarioExistente.setRoles(usuario.getRoles());
        return usuarioRepository.save(usuarioExistente);
    }

    public void updatePassword(Usuario user, String newPassword) {
        user.setSenha(passwordEncoder.encode(newPassword)); // Lembre-se de aplicar criptografia para a senha
        usuarioRepository.save(user);
    }

    public void delete(Long id) {
        Usuario usuario = findById(id);
        usuarioRepository.delete(usuario);
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
