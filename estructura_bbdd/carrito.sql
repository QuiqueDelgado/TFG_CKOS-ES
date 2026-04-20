CREATE TABLE carrito (
  usuario_id INT,
  producto_id INT,
  cantidad INT,
  PRIMARY KEY (usuario_id, producto_id),

  FOREIGN KEY (usuario_id)
    REFERENCES usuarios(idusuario)
    ON DELETE CASCADE,

  FOREIGN KEY (producto_id)
    REFERENCES productos(idproducto)
    ON DELETE CASCADE
);