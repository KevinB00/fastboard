package com.kevin.fastboard.controller.auth;

import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kevin.fastboard.controller.auth.dto.JwtResponse;
import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.service.user.IUsuarioService;

import utils.JwtUtils;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUsuarioService userService;

    @Autowired
    private JwtUtils jwtUtil;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody String nuevoUsuario) throws Exception {
        String decodeJson = URLDecoder.decode(nuevoUsuario, "UTF-8");
        UsuarioEntity userRegistrado = userService.registrar(decodeJson);
        if (userRegistrado.getId() == null) {
            return ResponseEntity.badRequest().build();
            
        }else{
            return ResponseEntity.ok().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody String entity) throws Exception {
        String decodeJson = URLDecoder.decode(entity, "UTF-8");
        UsuarioEntity loginUsuario = userService.login(decodeJson);
        if (loginUsuario.getId() == null) {
            return ResponseEntity.badRequest().build();
        }else{
            Authentication authentication = new UsernamePasswordAuthenticationToken(loginUsuario.getEmail(), loginUsuario.getContrasenya());
            String token = jwtUtil.generateToken(authentication.getName());
            
            JwtResponse jwtResponse = new JwtResponse(
                token,
                loginUsuario.getNombre(),
                loginUsuario.getRoles().stream()
                    .findFirst()
                    .map(role -> role.getRoleEnum().name())
                    .orElse("USER")
            );

            return ResponseEntity.ok(jwtResponse);
        }

    }

}
