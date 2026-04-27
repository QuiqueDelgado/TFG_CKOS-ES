package com.tfg.tienda.repository;

import com.tfg.tienda.model.Noticia;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticiaRepository extends JpaRepository<Noticia, Integer> {

}