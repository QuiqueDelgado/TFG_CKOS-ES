package com.tfg.tienda.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
/**
 * Entidad que representa la tabla productos en la bbdd.
 * Incluye validaciones para garantizar la integridad de los datos.
 */
@Entity // Marca la clase como entidad JPA
@Table(name = "productos") // Nombre de la tabla en BD
public class Producto {

    // Clave primaria autoincremental
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproducto")
    private Integer id;

    // Nombre obligatorio y no vacío
    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 100)
    private String nombre;

    // Precio obligatorio y mayor que 0
    // Se usa BigDecimal para evitar errores de precisión
    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    private BigDecimal precio;

    @NotNull(message = "La categoria es obligatoria")
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    @JsonIgnoreProperties("productos")

    private Categoria categoria;

    // Stock no puede ser negativo
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

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Categoria getCategoria() {
    return categoria;
}
    public void setCategoria(Categoria categoria) {
    this.categoria = categoria;
}
}

