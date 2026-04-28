package com.tfg.tienda.controller;

import com.tfg.tienda.dto.ContactoDTO;
import com.tfg.tienda.dto.NewsletterDTO;
import com.tfg.tienda.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacto")
public class ContactoController {

    private final EmailService emailService;

    public ContactoController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> contacto(@RequestBody ContactoDTO dto) {
        emailService.enviarContacto(dto);
        return ResponseEntity.ok("Mensaje enviado");
    }

    @PostMapping("/newsletter")
    public ResponseEntity<String> newsletter(@RequestBody NewsletterDTO dto) {
        emailService.enviarNewsletter(dto.getEmail());
        return ResponseEntity.ok("Suscripción registrada");
    }
}
