package com.tfg.tienda.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tfg.tienda.model.Producto;
import com.tfg.tienda.service.ProductoService;

import jakarta.validation.Valid;

/**
 * Controller REST para gestionar productos.
 * Se encarga de recibir peticiones HTTP y delegar la lógica al Service.
 */
@RestController // Indica que devuelve JSON automáticamente
@RequestMapping("/productos") // Ruta base de todos los endpoints
public class ProductoController {

    // Inyección de dependencias (Service)
    // Se usa final + constructor → buena práctica (inmutabilidad)
    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    /**
     * Obtiene todos los productos
     * GET /productos
     */
    @GetMapping
    public List<Producto> getAll() {
    List<Producto> productos = service.getAll();
    System.out.println("Productos: " + productos);
    return productos;
}

    /**
     * Obtiene un producto por ID
     * GET /productos/{id}
     */
    @GetMapping("/{id}")
    public Producto getById(@PathVariable Integer id) {
        return service.getById(id); // El Service gestiona si no existe
    }

    /**
     * Crea un nuevo producto
     * POST /productos
     * @Valid activa las validaciones definidas en la entidad
     */
    @PostMapping
    public Producto crear(@Valid @RequestBody Producto producto) {
        return service.crear(producto);
    }

    /**
     * Actualiza un producto existente
     * PUT /productos/{id}
     */
    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Integer id, @Valid @RequestBody Producto producto) {
        return service.actualizar(id, producto);
    }

    /**
     * Elimina un producto
     * DELETE /productos/{id}
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}
