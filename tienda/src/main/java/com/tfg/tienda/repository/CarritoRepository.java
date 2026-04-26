package com.tfg.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.tienda.model.Carrito;

public interface CarritoRepository extends JpaRepository<Carrito, Integer> {}