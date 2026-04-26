error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/PedidoService.java:ProductoRepository#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/PedidoService.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 394
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/PedidoService.java
text:
```scala
package com.tfg.tienda.service;

import org.springframework.stereotype.Service;
import com.tfg.tienda.model.*;
import com.tfg.tienda.repository.*;
import java.util.List;
import java.math.BigDecimal;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepo;
    private final ProductoRepository@@ productoRepo;
    private final UsuarioRepository usuarioRepo;

    public PedidoService(PedidoRepository pedidoRepo,
    ProductoRepository productoRepo,
    UsuarioRepository usuarioRepo) {

    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
    this.usuarioRepo = usuarioRepo;
}

    public Pedido crearPedido(Pedido pedido) {
    if (pedido.getLineas() == null || pedido.getLineas().isEmpty()) {
    throw new RuntimeException("El pedido no puede estar vacío");
}
    if (pedido.getLineas() == null || pedido.getLineas().isEmpty()) {
    throw new RuntimeException("El pedido no puede estar vacío");
}
    BigDecimal total = BigDecimal.ZERO;

    for (LineaPedido linea : pedido.getLineas()) {

        Producto producto = productoRepo.findById(linea.getProducto().getId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // validar stock
        if (producto.getStock() < linea.getCantidad()) {
            throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
        }

        // restar stock
        producto.setStock(producto.getStock() - linea.getCantidad());

        linea.setProducto(producto);
        linea.setPedido(pedido);
        linea.setPrecioUnitario(producto.getPrecio());

        BigDecimal subtotal = producto.getPrecio()
            .multiply(BigDecimal.valueOf(linea.getCantidad()));

        total = total.add(subtotal);
    }

    String email = SecurityContextHolder.getContext().getAuthentication().getName();

    Usuario usuario = usuarioRepo.findByEmail(email)
    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    pedido.setUsuario(usuario);
    pedido.setTotal(total);

    return pedidoRepo.save(pedido);
    }

    public List<Pedido> misPedidos() {

    String email = SecurityContextHolder.getContext().getAuthentication().getName();

    return pedidoRepo.findByUsuarioEmail(email);
    }   
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: 