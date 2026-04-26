package com.tfg.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.tienda.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {}