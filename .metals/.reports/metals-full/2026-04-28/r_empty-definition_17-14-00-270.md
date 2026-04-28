error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/PedidoService.java:org/springframework/http/HttpStatus#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/PedidoService.java
empty definition using pc, found symbol in pc: org/springframework/http/HttpStatus#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 449
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/service/PedidoService.java
text:
```scala
package com.tfg.tienda.service;

import org.springframework.stereotype.Service;

import com.tfg.tienda.dto.PedidoRequestDTO;
import com.tfg.tienda.model.*;
import com.tfg.tienda.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatu@@s;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepo;
    private final ProductoRepository productoRepo;
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
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El pedido no puede estar vacío");
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
    
    public Pedido crearPedidoDesdeDTO(PedidoRequestDTO dto) {

    Usuario usuario = usuarioRepo.findById(dto.getUsuarioId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

    Pedido pedido = new Pedido();
    pedido.setUsuario(usuario);

    List<LineaPedido> lineas = new ArrayList<>();

    BigDecimal total = BigDecimal.ZERO;

    for (PedidoRequestDTO.LineaDTO lineaDto : dto.getLineas()) {

        Producto producto = productoRepo.findById(lineaDto.getProductoId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        if (producto.getStock() < lineaDto.getCantidad()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock insuficiente: " + producto.getNombre());
        }

        producto.setStock(producto.getStock() - lineaDto.getCantidad());

        LineaPedido linea = new LineaPedido();
        linea.setPedido(pedido);
        linea.setProducto(producto);
        linea.setCantidad(lineaDto.getCantidad());
        linea.setPrecioUnitario(producto.getPrecio());

        total = total.add(producto.getPrecio().multiply(BigDecimal.valueOf(lineaDto.getCantidad())));
        lineas.add(linea);
    }

    pedido.setLineas(lineas);
    pedido.setTotal(total);

    return pedidoRepo.save(pedido);

```


#### Short summary: 

empty definition using pc, found symbol in pc: org/springframework/http/HttpStatus#