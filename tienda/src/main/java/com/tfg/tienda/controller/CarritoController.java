package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;
import com.tfg.tienda.model.Carrito;
import com.tfg.tienda.model.Pedido;
import com.tfg.tienda.service.CarritoService;

@RestController
@RequestMapping("/carritos")
public class CarritoController {

    private final CarritoService service;

    public CarritoController(CarritoService service) {
        this.service = service;
    }

    @PostMapping
    public Carrito crear() {
        return service.crearCarrito();
    }

    @PostMapping("/{id}/items")
    public Carrito añadir(@PathVariable Integer id,
                          @RequestParam Integer productoId,
                          @RequestParam Integer cantidad) {
        return service.añadirProducto(id, productoId, cantidad);
    }

    @PostMapping("/{id}/checkout")
    public Pedido checkout(@PathVariable Integer id) {
    return service.convertirAPedido(id);
}
}