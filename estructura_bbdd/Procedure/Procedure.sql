DELIMITER $$

CREATE PROCEDURE crear_pedido_desde_carrito (
    IN p_usuario_id INT
)
BEGIN
    DECLARE v_pedido_id INT;

    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Crear pedido
    INSERT INTO pedidos (usuario_id, estado)
    VALUES (p_usuario_id, 0);

    SET v_pedido_id = LAST_INSERT_ID();

    -- Insertar líneas desde carrito 
    INSERT INTO lineas_pedido (pedido_id, producto_id, cantidad, precio_unitario)
    SELECT 
        v_pedido_id,
        c.producto_id,
        c.cantidad,
        p.precio
    FROM carrito c
    JOIN productos p ON p.idproducto = c.producto_id
    WHERE c.usuario_id = p_usuario_id;

    -- Calcular total correctamente
    UPDATE pedidos
    SET total = (
        SELECT SUM(cantidad * precio_unitario)
        FROM lineas_pedido
        WHERE pedido_id = v_pedido_id
    )
    WHERE idpedido = v_pedido_id;

    -- Vaciar carrito
    DELETE FROM carrito
    WHERE usuario_id = p_usuario_id;

    COMMIT;

END$$

DELIMITER ;