package com.kevin.fastboard.controller.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kevin.fastboard.service.user.IUsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUsuarioService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody String entity) {
        userService.registrar(entity);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String entity) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(entity, entity));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return ResponseEntity.ok("success");
    }

}
