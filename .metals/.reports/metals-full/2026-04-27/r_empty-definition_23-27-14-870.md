error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ContactoController.java:_empty_/ContactoDTO#getNombre#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ContactoController.java
empty definition using pc, found symbol in pc: _empty_/ContactoDTO#getNombre#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 767
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ContactoController.java
text:
```scala
package com.tfg.tienda.controller;


import com.tfg.tienda.dto.ContactoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@RestController
@RequestMapping("/contacto")
@CrossOrigin(origins = "*")
public class ContactoController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public String enviar(@RequestBody ContactoDTO dto) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo("TU_EMAIL@gmail.com"); // 👈 cambia esto
        mail.setSubject("Nuevo mensaje desde la web");

        mail.setText(
            "Nombre: " + dto.getN@@ombre() +
            "\nEmail: " + dto.getEmail() +
            "\n\nMensaje:\n" + dto.getMensaje()
        );

        mailSender.send(mail);

        return "Mensaje enviado correctamente";
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/ContactoDTO#getNombre#