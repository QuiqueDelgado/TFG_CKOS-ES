package com.tfg.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.tienda.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}