package com.kevin.fastboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kevin.fastboard.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    public Usuario save(Usuario user);

    public Usuario findByEmail(String email);
}
