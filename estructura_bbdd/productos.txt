CREATE TABLE `tfg_db`.`productos` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `categoria_id` INT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idproducto`));
  
  //FK

  ALTER TABLE `tfg_db`.`productos` 
ADD INDEX `fk_productos_categorias_idx` (`categoria_id` ASC) VISIBLE;
;
ALTER TABLE `tfg_db`.`productos` 
ADD CONSTRAINT `fk_productos_categorias`
  FOREIGN KEY (`categoria_id`)
  REFERENCES `tfg_db`.`categorias` (`idcategoria`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;