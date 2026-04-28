package com.tfg.tienda.dto;

public class AuthResponseDTO {
    private Integer id;
    private String email;
    private String rol;

    public AuthResponseDTO(Integer id, String email, String rol) {
        this.id = id;
        this.email = email;
        this.rol = rol;
    }

    public Integer getId() { return id; }
    public String getEmail() { return email; }
    public String getRol() { return rol; }
}
