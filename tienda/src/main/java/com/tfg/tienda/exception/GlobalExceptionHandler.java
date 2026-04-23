package com.tfg.tienda.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

/**
 * Manejador global de excepciones.
 * Permite capturar errores de validación y devolver respuestas estructuradas.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja errores de validación (@Valid)
     * Devuelve un JSON con los campos y sus mensajes de error
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> manejarErroresValidacion(MethodArgumentNotValidException ex) {

        // Mapa de errores por campo
        Map<String, String> errores = new HashMap<>();

        // Recorre todos los errores de validación
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errores.put(error.getField(), error.getDefaultMessage());
        });

        // Estructura final de respuesta
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("errores", errores);

        return respuesta;
    }
}
