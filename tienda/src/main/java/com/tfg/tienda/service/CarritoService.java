package com.tfg.tienda.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import com.tfg.tienda.model.*;
import com.tfg.tienda.repository.*;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepo;
    private final ProductoRepository productoRepo;

    //AÑADIR ESTO
    private final PedidoService pedidoService;

    //MODIFICAR CONSTRUCTOR
    public CarritoService(CarritoRepository carritoRepo,
                          ProductoRepository productoRepo,
                          PedidoService pedidoService) {

        this.carritoRepo = carritoRepo;
        this.productoRepo = productoRepo;
        this.pedidoService = pedidoService;
    }

    public Carrito crearCarrito() {
        return carritoRepo.save(new Carrito());
    }

    public Carrito añadirProducto(Integer carritoId, Integer productoId, Integer cantidad) {

        Carrito carrito = carritoRepo.findById(carritoId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        Producto producto = productoRepo.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        //evitar duplicados
        for (ItemCarrito item : carrito.getItems()) {
            if (item.getProducto().getId().equals(productoId)) {
                item.setCantidad(item.getCantidad() + cantidad);
                return carritoRepo.save(carrito);
            }
        }

        ItemCarrito item = new ItemCarrito();
        item.setCarrito(carrito);
        item.setProducto(producto);
        item.setCantidad(cantidad);

        carrito.getItems().add(item);

        return carritoRepo.save(carrito);
    }

    public Pedido convertirAPedido(Integer carritoId) {

        Carrito carrito = carritoRepo.findById(carritoId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        Pedido pedido = new Pedido();

        List<LineaPedido> lineas = new ArrayList<>();

        for (ItemCarrito item : carrito.getItems()) {

            LineaPedido linea = new LineaPedido();
            linea.setProducto(item.getProducto());
            linea.setCantidad(item.getCantidad());

            lineas.add(linea);
        }

        pedido.setLineas(lineas);

        // reutiliza lógica existente
        Pedido pedidoGuardado = pedidoService.crearPedido(pedido);

        // limpiar carrito
        carrito.getItems().clear();
        carritoRepo.save(carrito);

        return pedidoGuardado;
    }

    public Carrito eliminarProducto(Integer carritoId, Integer productoId) {

    Carrito carrito = carritoRepo.findById(carritoId)
        .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

    carrito.getItems().removeIf(item ->
        item.getProducto().getId().equals(productoId)
    );

    return carritoRepo.save(carrito);
    }

    public Carrito actualizarCantidad(Integer carritoId, Integer productoId, Integer cantidad) {

    Carrito carrito = carritoRepo.findById(carritoId)
        .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

    for (ItemCarrito item : carrito.getItems()) {
        if (item.getProducto().getId().equals(productoId)) {

            if (cantidad <= 0) {
                carrito.getItems().remove(item);
            } else {
                item.setCantidad(cantidad);
            }

            return carritoRepo.save(carrito);
        }
    }

    throw new RuntimeException("Producto no está en el carrito");
    }
}