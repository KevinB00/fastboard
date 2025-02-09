package com.kevin.fastboard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kevin.fastboard.entity.ComentarioEntity;

@Repository
public interface ComentarioRepository extends CrudRepository<ComentarioEntity, Integer> {

    List<ComentarioEntity> findByTareaid(Integer id);

}
