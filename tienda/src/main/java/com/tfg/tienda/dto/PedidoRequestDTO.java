package com.tfg.tienda.dto;

import java.util.List;

public class PedidoRequestDTO {

    private Integer usuarioId;
    private List<LineaDTO> lineas;

    public static class LineaDTO {
        private Integer productoId;
        private Integer cantidad;

        public Integer getProductoId() { return productoId; }
        public void setProductoId(Integer productoId) { this.productoId = productoId; }

        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    }

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }

    public List<LineaDTO> getLineas() { return lineas; }
    public void setLineas(List<LineaDTO> lineas) { this.lineas = lineas; }
}
