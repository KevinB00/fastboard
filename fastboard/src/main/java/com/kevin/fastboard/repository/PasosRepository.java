package com.kevin.fastboard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.kevin.fastboard.entity.PasosEntity;

public interface PasosRepository extends CrudRepository<PasosEntity, Integer> {

    List<PasosEntity> findByTareaid(Integer id);

}
