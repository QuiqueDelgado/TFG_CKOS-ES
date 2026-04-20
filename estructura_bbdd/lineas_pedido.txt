CREATE TABLE `tfg_db`.`lineas_pedido` (
  `pedido_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`pedido_id`, `producto_id`));

  //FK

  ALTER TABLE `tfg_db`.`lineas_pedido` 
ADD INDEX `fk_producto_id_idx` (`producto_id` ASC) VISIBLE;
;
ALTER TABLE `tfg_db`.`lineas_pedido` 
ADD CONSTRAINT `fk_lineas_pedido_pedido_id`
  FOREIGN KEY (`pedido_id`)
  REFERENCES `tfg_db`.`pedidos` (`idpedido`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk_producto_id`
  FOREIGN KEY (`producto_id`)
  REFERENCES `tfg_db`.`productos` (`idproducto`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;