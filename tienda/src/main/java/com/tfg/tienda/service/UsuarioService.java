package com.tfg.tienda.service;

import com.tfg.tienda.dto.*;
import com.tfg.tienda.model.Usuario;
import com.tfg.tienda.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponseDTO register(RegisterRequestDTO dto) {
        if (repo.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email ya registrado");
        }

        Usuario u = new Usuario();
        u.setEmail(dto.getEmail());
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setRol("USER");

        Usuario saved = repo.save(u);
        return new AuthResponseDTO(saved.getId(), saved.getEmail(), saved.getRol());
    }

    public AuthResponseDTO getByEmail(String email) {
        Usuario u = repo.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        return new AuthResponseDTO(u.getId(), u.getEmail(), u.getRol());
    }
}