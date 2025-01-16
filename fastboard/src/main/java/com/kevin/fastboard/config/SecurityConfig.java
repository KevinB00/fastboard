package com.kevin.fastboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.kevin.fastboard.service.user.CustomUsuarioDetailsService;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUsuarioDetailsService customUsuarioDetailsService;

    public SecurityConfig(CustomUsuarioDetailsService customUsuarioDetailsService) {
        this.customUsuarioDetailsService = customUsuarioDetailsService;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/api/**")
                        .ignoringRequestMatchers("/landing-user"))
                .authorizeRequests(requests -> {
                    try {
                        requests
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/landing-user").authenticated()
                                .anyRequest().permitAll()
                                .and()
                                .formLogin(form -> form.disable())
                                .httpBasic(withDefaults());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .build();
    }

}
