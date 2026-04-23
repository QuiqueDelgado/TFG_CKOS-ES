error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/ProductoService.java:_empty_/Producto#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/ProductoService.java
empty definition using pc, found symbol in pc: _empty_/Producto#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 1491
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/ProductoService.java
text:
```scala
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
    @@Producto producto = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    try {
        repo.delete(producto);
    } catch (Exception e) {
        throw new RuntimeException("No se puede eliminar el producto porque está asociado a pedidos");
    }
}
} 

```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/Producto#