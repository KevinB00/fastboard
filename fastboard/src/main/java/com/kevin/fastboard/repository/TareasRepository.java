package com.kevin.fastboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kevin.fastboard.entity.TareaEntity;

@Repository
public interface TareasRepository extends CrudRepository<TareaEntity, Integer> {

    List<TareaEntity> findByListaid(Integer id);

    @Query(value = "SELECT t.* " 
     + "FROM tareas t "
     + "INNER JOIN listas l ON t.listaid = l.id "
     + "INNER JOIN proyecto p ON l.proyectoid = p.id "
     + "WHERE p.usuariocreador = ?1", nativeQuery = true)
/*      + "WHERE t.listaid = l.id "
     + "AND l.proyectoid = p.id "
     + "AND p.usuariocreador = ?1", nativeQuery = true)*/
    List<TareaEntity> findByUser(Integer userId);

    @Query(value = "SELECT id "
     + "FROM usuario "
     + "WHERE email = ?1", nativeQuery = true)
    Integer findUserId(String username);

}
