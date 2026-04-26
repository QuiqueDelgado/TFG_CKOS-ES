package com.tfg.tienda.service;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.tfg.tienda.model.Usuario; // 🔥 FALTABA
import com.tfg.tienda.repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository repo;

    public CustomUserDetailsService(UsuarioRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    System.out.println("🔥 LOGIN INTENT: " + email);

    Usuario user = repo.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

    System.out.println("PASS BD: " + user.getPassword()); // 👈 ahora sí

    return org.springframework.security.core.userdetails.User
        .withUsername(user.getEmail())
        .password(user.getPassword())
        .authorities("ROLE_" + user.getRol())
        .build();
}
}