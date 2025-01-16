package com.kevin.fastboard.service.user;

import java.util.Optional;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.fastboard.entities.Usuario;
import com.kevin.fastboard.repository.UsuarioRepository;

@Service
public class UserService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Usuario registrar(String nuevoUsuario) {
        Usuario user = new Usuario();
        Usuario savedUser = new Usuario();
        try {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(nuevoUsuario);
        user.setNombre(node.get("name").asText());
        user.setApellido(node.get("lastName").asText());
        user.setEmail(node.get("email").asText());
        user.setContrasenya(passwordEncoder.encode(node.get("password").asText()));
        
        savedUser = usuarioRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return savedUser;
    }

    @Override
    public Usuario login(String login) {
        Usuario user = new Usuario();
        try {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(login);
        Usuario userEmail = usuarioRepository.findByEmail(node.get("email").asText());
        if (userEmail != null) {
            String password = userEmail.getContrasenya();
            if (new BCryptPasswordEncoder().matches(node.get("password").asText(), password)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(node.get("email").asText(), node.get("password").asText());
                authenticationManager.authenticate(authenticationToken);
                return userEmail;
            }
        } else {
            return user;
        }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }
                
            }
            

