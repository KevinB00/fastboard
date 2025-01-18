package com.kevin.fastboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kevin.fastboard.entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    public UsuarioEntity save(UsuarioEntity user);

    public UsuarioEntity findByEmail(String email);
}
