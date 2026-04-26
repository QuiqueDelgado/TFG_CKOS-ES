package com.tfg.tienda.service;

import org.springframework.stereotype.Service;
import com.tfg.tienda.model.*;
import com.tfg.tienda.repository.*;
import java.util.List;
import java.math.BigDecimal;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepo;
    private final ProductoRepository productoRepo;

    public PedidoService(PedidoRepository pedidoRepo, ProductoRepository productoRepo) {
        this.pedidoRepo = pedidoRepo;
        this.productoRepo = productoRepo;
    }

    public Pedido crearPedido(Pedido pedido) {

        BigDecimal total = BigDecimal.ZERO;

            for (LineaPedido linea : pedido.getLineas()) {

    Producto producto = productoRepo.findById(linea.getProducto().getId())
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    //VALIDAR STOCK
    if (producto.getStock() < linea.getCantidad()) {
        throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
    }

    //RESTAR STOCK
    producto.setStock(producto.getStock() - linea.getCantidad());

    linea.setProducto(producto);
    linea.setPedido(pedido);
    linea.setPrecioUnitario(producto.getPrecio());

    BigDecimal subtotal = producto.getPrecio()
        .multiply(BigDecimal.valueOf(linea.getCantidad()));

    total = total.add(subtotal);
}

    pedido.setTotal(total);
    return pedidoRepo.save(pedido);
}
}