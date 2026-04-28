package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;
import com.tfg.tienda.dto.RegisterRequestDTO;
import com.tfg.tienda.dto.AuthResponseDTO;
import com.tfg.tienda.service.UsuarioService;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registro")
    public ResponseEntity<AuthResponseDTO> registrar(@RequestBody RegisterRequestDTO dto) {
        return ResponseEntity.ok(service.register(dto));
    }
}