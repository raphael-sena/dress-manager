package com.DressManager.dressmanager.controller;

import com.DressManager.dressmanager.dto.usuario.ResetPasswordDTO;
import com.DressManager.dressmanager.model.Usuario;
import com.DressManager.dressmanager.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("api/password")
public class PasswordResetController {

    @Autowired
    private UsuarioService userService;

    // Endpoint para verificar se o e-mail é válido
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("email") String email) {
        System.out.println(email);
        Optional<Usuario> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário com este email não foi encontrado.");
        }

        return ResponseEntity.ok("Email verificado. Você pode redefinir sua senha.");
    }

    // Endpoint para redefinir a senha sem token
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        Optional<Usuario> userOpt = userService.findByEmail(resetPasswordDTO.email());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário com este email não foi encontrado.");
        }

        Usuario user = userOpt.get();
        userService.updatePassword(user, resetPasswordDTO.password());

        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }
}
