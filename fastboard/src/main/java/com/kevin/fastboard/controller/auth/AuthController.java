package com.kevin.fastboard.controller.auth;

import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kevin.fastboard.entities.Usuario;
import com.kevin.fastboard.service.user.IUsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUsuarioService userService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody String nuevoUsuario) throws Exception {
        String decodeJson = URLDecoder.decode(nuevoUsuario, "UTF-8");
        Usuario userRegistrado = userService.registrar(decodeJson);
        if (userRegistrado.getId() == null) {
            return ResponseEntity.badRequest().build();
            
        }else{
            return ResponseEntity.ok("success");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String entity) throws Exception {
        String decodeJson = URLDecoder.decode(entity, "UTF-8");
        Usuario loginUsuario = userService.login(decodeJson);
        if (loginUsuario.getId() == null) {
            return ResponseEntity.badRequest().build();
        }else{
            Authentication authentication = new UsernamePasswordAuthenticationToken(loginUsuario.getEmail(), loginUsuario.getContrasenya());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("success");
        }

    }

}
