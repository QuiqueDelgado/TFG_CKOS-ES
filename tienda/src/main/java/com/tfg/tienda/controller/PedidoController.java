package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List; // 🔥 FALTABA

import com.tfg.tienda.model.Pedido;
import com.tfg.tienda.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @PostMapping
    public Pedido crear(@RequestBody Pedido pedido) {
        return service.crearPedido(pedido);
    }

    @GetMapping("/mios")
    public List<Pedido> misPedidos() {
        return service.misPedidos();
    }
}