package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;

import com.tfg.tienda.model.Usuario;
import com.tfg.tienda.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return service.registrar(usuario);
    }
}