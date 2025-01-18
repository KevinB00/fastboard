package com.kevin.fastboard.service.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.repository.UsuarioRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsuarioEntity user = usuarioRepository.findByEmail(email);
        if (user != null) {
            List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
    }
            return null;
    }
}
