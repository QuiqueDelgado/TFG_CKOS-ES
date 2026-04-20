CREATE TABLE `tfg_db`.`pedidos` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` TINYINT NOT NULL DEFAULT 0 COMMENT 'Estado = 0(pendiente)\n	       1(pagado)\n	       2(enviado)',
  `total` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idpedido`));

    //FK

  ALTER TABLE `tfg_db`.`pedidos` 
ADD INDEX `fk_usuario_id_idx` (`usuario_id` ASC) VISIBLE;
;
ALTER TABLE `tfg_db`.`pedidos` 
ADD CONSTRAINT `fk_usuario_id`
  FOREIGN KEY (`usuario_id`)
  REFERENCES `tfg_db`.`usuarios` (`idusuario`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;