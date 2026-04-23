package com.tfg.tienda.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.tfg.tienda.model.Producto;
import com.tfg.tienda.repository.ProductoRepository;

/**
 * Capa de lógica de negocio.
 * Intermedia entre Controller y Repository.
 */
@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    // Obtener todos los productos
    public List<Producto> getAll() {
        return repo.findAll();
    }

    // Obtener por ID (lanza excepción si no existe)
    public Producto getById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    // Crear producto
    public Producto crear(Producto producto) {
        return repo.save(producto);
    }

    // Actualizar producto
    public Producto actualizar(Integer id, Producto producto) {
        return repo.findById(id)
                .map(p -> {
                    p.setNombre(producto.getNombre());
                    p.setPrecio(producto.getPrecio());
                    p.setCategoriaId(producto.getCategoriaId());
                    p.setStock(producto.getStock());
                    return repo.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    // Eliminar producto
    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
} 
