package com.tfg.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.tienda.model.Producto;

/**
 * Repository de acceso a datos para Producto.
 * Extiende JpaRepository, lo que proporciona automáticamente
 * operaciones CRUD sin necesidad de implementación manual.
 */
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    // No es necesario implementar métodos básicos (findAll, save, etc.)
}