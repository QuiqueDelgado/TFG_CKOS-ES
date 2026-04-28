package com.tfg.tienda.service;

import com.tfg.tienda.dto.ContactoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String miCorreo;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarContacto(ContactoDTO dto) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(miCorreo);
        msg.setTo(miCorreo);
        msg.setSubject("Nuevo mensaje de contacto — " + dto.getNombre());
        msg.setText(
            "Nombre: " + dto.getNombre() + "\n" +
            "Email: " + dto.getEmail() + "\n\n" +
            "Mensaje:\n" + dto.getMensaje()
        );
        mailSender.send(msg);
    }

    public void enviarNewsletter(String emailSuscriptor) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(miCorreo);
        msg.setTo(miCorreo);
        msg.setSubject("Nueva suscripción al newsletter");
        msg.setText("Nuevo suscriptor: " + emailSuscriptor);
        mailSender.send(msg);
    }
}