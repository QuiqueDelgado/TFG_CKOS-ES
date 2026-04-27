package com.tfg.tienda.controller;

import com.tfg.tienda.model.Noticia;
import com.tfg.tienda.repository.NoticiaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/noticias")
@CrossOrigin(origins = "*")
public class NoticiaController {

    @Autowired
    private NoticiaRepository repo;

    @GetMapping
    public List<Noticia> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Noticia getById(@PathVariable Integer id) {
    return repo.findById(id).orElse(null);
}
}