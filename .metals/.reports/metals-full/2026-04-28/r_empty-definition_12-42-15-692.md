error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java:java/lang/System#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java
empty definition using pc, found symbol in pc: java/lang/System#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 591
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/EmailService.java
text:
```scala
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
    @@System.out.println("📧 Enviando desde: " + miCorreo);
    try {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(miCorreo);
        msg.setSubject("Nuevo mensaje de contacto — " + dto.getNombre());
        msg.setText(
            "Nombre: " + dto.getNombre() + "\n" +
            "Email: " + dto.getEmail() + "\n\n" +
            "Mensaje:\n" + dto.getMensaje()
        );
        mailSender.send(msg);
        System.out.println("✅ Correo enviado");
    } catch (Exception e) {
        System.out.println("❌ Error al enviar correo: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException(e);
    }
}

    public void enviarNewsletter(String emailSuscriptor) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(miCorreo);
        msg.setSubject("Nueva suscripción al newsletter");
        msg.setText("Nuevo suscriptor: " + emailSuscriptor);
        mailSender.send(msg);
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: java/lang/System#