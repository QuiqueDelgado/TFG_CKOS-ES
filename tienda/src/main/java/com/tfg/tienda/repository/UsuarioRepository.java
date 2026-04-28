package com.tfg.tienda.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.tienda.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}