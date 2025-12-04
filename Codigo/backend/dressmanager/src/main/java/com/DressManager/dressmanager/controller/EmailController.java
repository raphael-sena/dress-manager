package com.DressManager.dressmanager.controller;

import com.DressManager.dressmanager.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping()
public class EmailController {

    @Autowired
    private EmailService emailService;


    @PostMapping("/relatorios/exportar")
    public ResponseEntity<?> enviarRelatorio(
            @RequestPart("email") String email,
            @RequestPart("file") MultipartFile file
    ) {
        try {
            emailService.sendEmailWithPdf(email, "Relatório de Aluguéis", file);
            return ResponseEntity.ok("Relatório enviado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao enviar o relatório: " + e.getMessage());
        }
    }

}

