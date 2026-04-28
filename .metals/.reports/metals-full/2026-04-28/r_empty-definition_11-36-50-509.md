error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java:_empty_/Configuration#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java
empty definition using pc, found symbol in pc: _empty_/Configuration#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 579
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java
text:
```scala
package com.tfg.tienda.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import com.tfg.tienda.service.CustomUserDetailsService;

@Config@@uration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors() // 🔥 ahora sí funciona
            .and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/productos/**",
                    "/img/**",
                    "/noticias/**",
                    "/novedades.html",
                    "/css/**",
                    "/js/**"
                ).permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {

        org.springframework.web.cors.CorsConfiguration config =
                new org.springframework.web.cors.CorsConfiguration();

        config.setAllowedOrigins(java.util.List.of(
                "http://127.0.0.1:5500",
                "http://localhost:5500"
        ));

        config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(java.util.List.of("*"));
        config.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
                new org.springframework.web.cors.UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/Configuration#