error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ProductoController.java:_empty_/PutMapping#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ProductoController.java
empty definition using pc, found symbol in pc: _empty_/PutMapping#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 897
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/ProductoController.java
text:
```scala
package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.tfg.tienda.model.Producto;
import com.tfg.tienda.repository.ProductoRepository;
import com.tfg.tienda.service.ProductoService;
import com.tfg.tienda.service.ProductoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/productos")
public class ProductoController {

   private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

   @GetMapping
    public List<Producto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Producto getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return service.crear(producto);
    }

    @PutM@@apping("/{id}")
    public Producto actualizar(@PathVariable Integer id, @RequestBody Producto producto) {
        return service.actualizar(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/PutMapping#