error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Producto.java:_empty_/GeneratedValue#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Producto.java
empty definition using pc, found symbol in pc: _empty_/GeneratedValue#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 216
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Producto.java
text:
```scala
package com.tfg.tienda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedVa@@lue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproducto")
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 100)
    private String nombre;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    private BigDecimal precio;

    @NotNull(message = "La categoria es obligatoria")
    @Column(name = "categoria_id", nullable = false)
    private Integer categoriaId;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    // GETTERS Y SETTERS

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNombre() { return nombre; }
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

empty definition using pc, found symbol in pc: _empty_/GeneratedValue#