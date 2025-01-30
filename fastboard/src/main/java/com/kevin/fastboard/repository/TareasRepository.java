package com.kevin.fastboard.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kevin.fastboard.entity.TareaEntity;

@Repository
public interface TareasRepository extends CrudRepository<TareaEntity, Integer> {

}
