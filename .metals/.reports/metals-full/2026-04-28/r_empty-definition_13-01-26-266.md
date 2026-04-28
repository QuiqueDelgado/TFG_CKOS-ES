error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/PedidoController.java:_empty_/pedidoRepo#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/PedidoController.java
empty definition using pc, found symbol in pc: _empty_/pedidoRepo#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 670
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/controller/PedidoController.java
text:
```scala
package com.tfg.tienda.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.tfg.tienda.dto.PedidoRequestDTO;
import com.tfg.tienda.model.Pedido;
import com.tfg.tienda.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @PostMapping
    public Pedido crear(@RequestBody Pedido pedido) {
        return service.crearPedido(pedido);
    }

    @GetMapping("/mios")
public List<Pedido> misPedidos(@RequestParam Integer usuarioId) {
    return @@pedidoRepo.findByUsuarioId(usuarioId);
}

    @PostMapping("/nuevo")
    public Pedido crearDesdeDTO(@RequestBody PedidoRequestDTO dto) {
    return service.crearPedidoDesdeDTO(dto);
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/pedidoRepo#