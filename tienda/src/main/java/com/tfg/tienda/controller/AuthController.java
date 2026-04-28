package com.tfg.tienda.controller;

import com.tfg.tienda.dto.*;
import com.tfg.tienda.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authManager;

    public AuthController(UsuarioService usuarioService, AuthenticationManager authManager) {
        this.usuarioService = usuarioService;
        this.authManager = authManager;
    }

    // Registro
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO dto) {
        return ResponseEntity.ok(usuarioService.register(dto));
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        return ResponseEntity.ok(usuarioService.getByEmail(dto.getEmail()));
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest req, HttpServletResponse res) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(req, res, auth);
        }
        return ResponseEntity.ok().build();
    }

    // Comprobar sesión activa
    @GetMapping("/me")
    public ResponseEntity<AuthResponseDTO> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getName().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(usuarioService.getByEmail(auth.getName()));
    }
}
