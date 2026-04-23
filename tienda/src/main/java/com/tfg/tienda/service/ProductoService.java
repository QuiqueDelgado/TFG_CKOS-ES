package com.tfg.tienda.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.tfg.tienda.model.Producto;
import com.tfg.tienda.repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> getAll() {
        return repo.findAll();
    }

    public Producto getById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Producto crear(Producto producto) {
        return repo.save(producto);
    }

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

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}