error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Pedido.java:OneToMany#cascade#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Pedido.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 456
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/Pedido.java
text:
```scala
package com.tfg.tienda.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;
import java.math.BigDecimal;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idpedido")
    private Integer id;

    @OneToMany(mappedBy = "pedido", cascade@@ = CascadeType.ALL)
    @JsonManagedReference
    private List<LineaPedido> lineas;

    @Column(nullable = false)
    private BigDecimal total;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"password"}) // evita exponer password
    private Usuario usuario;

    // GETTERS Y SETTERS

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public List<LineaPedido> getLineas() { return lineas; }
    public void setLineas(List<LineaPedido> lineas) { this.lineas = lineas; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: 