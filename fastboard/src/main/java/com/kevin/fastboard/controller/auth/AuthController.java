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
import com.kevin.fastboard.controller.auth.dto.LoginRequest;
import com.kevin.fastboard.controller.auth.dto.RegisterRequest;
import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.service.user.IUsuarioService;

import utils.JwtUtils;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private IUsuarioService userService;

    @Autowired
    private JwtUtils jwtUtil;

    @PostMapping("/registrar")
    public ResponseEntity<JwtResponse> registrar(@RequestBody RegisterRequest registerRequest) throws Exception {
        UsuarioEntity userRegistrado = userService.registrar(registerRequest);
        if (userRegistrado.getId() == null) {
            return ResponseEntity.badRequest().build();

        } else {
            Authentication authentication = new UsernamePasswordAuthenticationToken(userRegistrado.getEmail(),
                    userRegistrado.getContrasenya());
            String token = jwtUtil.generateToken(authentication.getName());

            JwtResponse jwtResponse = new JwtResponse(
                    token,
                    userRegistrado.getEmail(),
                    userRegistrado.getRoles().stream()
                            .findFirst()
                            .map(role -> role.getRoleEnum().name())
                            .orElse("USER"));

            return ResponseEntity.ok(jwtResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
        System.out.println("Request received at /login: " + loginRequest);
        UsuarioEntity loginUsuario = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (loginUsuario.getId() == null) {
            return ResponseEntity.badRequest().build();
        } else {
            Authentication authentication = new UsernamePasswordAuthenticationToken(loginUsuario.getEmail(),
                    loginUsuario.getContrasenya());
            String token = jwtUtil.generateToken(authentication.getName());

            JwtResponse jwtResponse = new JwtResponse(
                    token,
                    loginUsuario.getEmail(),
                    loginUsuario.getRoles().stream()
                            .findFirst()
                            .map(role -> role.getRoleEnum().name())
                            .orElse("USER"));

            return ResponseEntity.ok(jwtResponse);
        }

    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<String> getNombreUsuario(@PathVariable Integer usuarioId) throws Exception {
        String nombreUsuario = userService.getNombreUsuarioById(usuarioId);
        if(nombreUsuario != null) {
            return ResponseEntity.ok(URLDecoder.decode(nombreUsuario, "UTF-8"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
