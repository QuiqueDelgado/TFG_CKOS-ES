package com.tfg.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.tienda.model.ItemCarrito;

public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Integer> {}