error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ProductoController.java:java/lang/String#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ProductoController.java
empty definition using pc, found symbol in pc: java/lang/String#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 822
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ProductoController.java
text:
```scala
package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Strin@@g getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Integer categoriaId) { this.categoriaId = categoriaId; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: java/lang/String#