error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Usuario.java:Column#nullable#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Usuario.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 325
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Usuario.java
text:
```scala
package com.tfg.tienda.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario") // 🔥 CLAVE
    private Integer id;

    @Column(nullable@@ = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol = "USER";

    

    //GETTERS Y SETTERS

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: 