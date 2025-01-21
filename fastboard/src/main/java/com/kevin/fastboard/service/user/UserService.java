package com.kevin.fastboard.service.user;

import java.util.Optional;
import java.util.Set;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.fastboard.entity.PermissionEntity;
import com.kevin.fastboard.entity.RoleEntity;
import com.kevin.fastboard.entity.RoleEnum;
import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.repository.PermissionRepository;
import com.kevin.fastboard.repository.RoleRepository;
import com.kevin.fastboard.repository.UsuarioRepository;

@Service
public class UserService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /*
     * Metodo para registrar un nuevo usuario
     * @param nuevoUsuario -> String que contiene la informacion del nuevo usuario en JSON
     * @return -> UsuarioEntity que contiene la informacion del nuevo usuario, si no se pudo registrar devuelve el usaurio vacío
     */
    @Override
    public UsuarioEntity registrar(String nuevoUsuario) {
        UsuarioEntity user = new UsuarioEntity();
        UsuarioEntity savedUser = new UsuarioEntity();
        // PermissionEntity creaPermissionEntity = new PermissionEntity();
        // creaPermissionEntity.setName("CREATE");
        // creaPermissionEntity.setName("READ");
        // creaPermissionEntity.setName("UPDATE");
        // RoleEntity role = new RoleEntity();
        // role.setRoleEnum(RoleEnum.USER);
        // role.setPermissions(Set.of(creaPermissionEntity));
        try {
        RoleEntity role = roleRepository.findById(2).get();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(nuevoUsuario);
        user.setNombre(node.get("name").asText());
        user.setApellido(node.get("lastName").asText());
        user.setEmail(node.get("email").asText());
        user.setContrasenya(passwordEncoder.encode(node.get("password").asText()));
        user.setEnabled(true);
        user.setAccountNoExpired(true);
        user.setAccountNoLocked(true);
        user.setCredentialsNoExpired(true);
        user.setRoles(Set.of(role));
        
        savedUser = usuarioRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return savedUser;
    }

    @Override
    public UsuarioEntity login(String email, String contrasenya) {
        UsuarioEntity user = new UsuarioEntity();
        try {
        UsuarioEntity userEmail = usuarioRepository.findByEmail(email);
        if (userEmail != null) {
            String password = userEmail.getContrasenya();
            if (new BCryptPasswordEncoder().matches(contrasenya, password)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, contrasenya);
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
            

