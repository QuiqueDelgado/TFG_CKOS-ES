error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Categoria.java:com/tfg/tienda/model/Categoria#`<init>`().
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Categoria.java
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol com/tfg/tienda/model/Categoria#`<init>`().
empty definition using fallback
non-local guesses:

offset: 182
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Categoria.java
text:
```scala
package com.tfg.tienda.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "categorias")
public class Categoria@@ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcategoria")
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "categoria")
    @JsonManagedReference
    private List<Producto> productos;

    // GETTERS Y SETTERS

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 