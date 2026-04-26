error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/LineaPedido.java:_empty_/productoRepo#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/LineaPedido.java
empty definition using pc, found symbol in pc: _empty_/productoRepo#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 625
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/model/LineaPedido.java
text:
```scala
package com.tfg.tienda.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "lineas_pedido")
public class LineaPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private Integer cantidad;

    @Column(name = "precio_unitario", nullable = false)
    private BigDecimal precioUnitario;

    for (LineaPedido linea : pedido.getLineas()) {

    Producto producto = productoRe@@po.findById(linea.getProducto().getId())
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    linea.setProducto(producto);
    linea.setPedido(pedido);

    // 🔥 AÑADE ESTO
    linea.setPrecioUnitario(producto.getPrecio());
}

    // GETTERS Y SETTERS

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioUnitario() {
    return precioUnitario;}

    public void setPrecioUnitario(BigDecimal precioUnitario) {
    this.precioUnitario = precioUnitario;}
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/productoRepo#