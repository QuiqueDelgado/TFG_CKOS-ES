error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java:_empty_/HttpSecurity#csrf#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java
empty definition using pc, found symbol in pc: _empty_/HttpSecurity#csrf#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 1318
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

@Configuration
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
        .c@@srf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            // 🔥 PERMITIR ESTO
            .requestMatchers(
                "/img/**",
                "/css/**",
                "/js/**",
                "/frontend/**",
                "/index.html"
            ).permitAll()

            // resto protegido
            .anyRequest().authenticated()
        )
        .httpBasic();

    return http.build();
    }
    
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/HttpSecurity#csrf#