package com.kevin.fastboard.config.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kevin.fastboard.service.user.UserDetailServiceImpl;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utils.JwtUtils;

@Component
public class JwtTokenValidator extends OncePerRequestFilter {

    private final JwtUtils jwtUtil;

    public JwtTokenValidator(JwtUtils jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    private UserDetailServiceImpl userDetailsService;

    /*
     * Validar el token JWT y autenticar al usuario utililzando la clase JwtUtil
     * @param request Peticion HTTP desde el frontend
     * @param response Respuesta HTTP hacia el frontend
     * @param filterChain Peticion HTTP hacia el backend
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            if (jwtUtil.validateToken(jwt)) {
                username = jwtUtil.extractUsername(jwt);
            }

            if (username != null && userDetailsService.loadUserByUsername(username) != null) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        username, null, userDetailsService.loadUserByUsername(username).getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
            filterChain.doFilter(request, response);
        }
    }

}