package com.DressManager.dressmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.web.multipart.MultipartFile;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailWithPdf(String recipientEmail, String subject, MultipartFile pdfFile) throws MessagingException, IOException {
        // Configurar o e-mail
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
        helper.setTo(recipientEmail);
        helper.setSubject(subject);
        helper.setText("Segue em anexo o relatório solicitado.", false);

        // Anexar o PDF ao e-mail
        helper.addAttachment("relatorio.pdf", new ByteArrayResource(pdfFile.getBytes()));

        // Enviar o e-mail
        mailSender.send(message);
    }

}
