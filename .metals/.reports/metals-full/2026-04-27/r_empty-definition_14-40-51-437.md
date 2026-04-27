error id: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java:org/springframework/security/web/SecurityFilterChain#
file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java
empty definition using pc, found symbol in pc: org/springframework/security/web/SecurityFilterChain#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 272
uri: file://<WORKSPACE>/tienda/src/main/java/com/tfg/tienda/config/SecurityConfig.java
text:
```scala
package com.tfg.tienda.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.Secur@@ityFilterChain;

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
        .cors() // 🔥 IMPORTANTE
        .and()
        .csrf().disable()
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(
                "/img/**",
                "/css/**",
                "/js/**",
                "/productos/**" // 🔥 necesario
            ).permitAll()
            .anyRequest().authenticated()
        );

    return http.build();
    } 
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: org/springframework/security/web/SecurityFilterChain#