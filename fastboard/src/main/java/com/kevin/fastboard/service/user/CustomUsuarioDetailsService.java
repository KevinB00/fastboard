package com.kevin.fastboard.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.entities.Usuario;
import com.kevin.fastboard.repository.UsuarioRepository;

@Service
public class CustomUsuarioDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new UsernameNotFoundException("No se encontro el usuario con el email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getContrasenya(),
                java.util.Collections.emptyList());
                
    }

    

}
