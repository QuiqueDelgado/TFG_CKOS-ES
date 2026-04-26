package com.tfg.tienda.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tfg.tienda.model.Producto;
import com.tfg.tienda.service.ProductoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    // GET /productos
    @GetMapping
    public List<Producto> getAll() {
        return service.getAll();
    }

    // GET /productos/{id}
    @GetMapping("/{id}")
    public Producto getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // POST /productos
    @PostMapping
    public Producto crear(@Valid @RequestBody Producto producto) {
        return service.crear(producto);
    }

    // PUT /productos/{id}
    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Integer id, @Valid @RequestBody Producto producto) {
        return service.actualizar(id, producto);
    }

    // DELETE /productos/{id}
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}
