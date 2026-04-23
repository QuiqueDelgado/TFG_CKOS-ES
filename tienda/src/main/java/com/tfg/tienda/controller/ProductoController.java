package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.tfg.tienda.model.Producto;
import com.tfg.tienda.repository.ProductoRepository;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Producto> getAll() {
        return repo.findAll();
    }

    @PostMapping // endpoint POST
    public Producto crear(@RequestBody Producto producto) { // Convierte JSON 
        return repo.save(producto); //Guarda en MySQL
    }
}
