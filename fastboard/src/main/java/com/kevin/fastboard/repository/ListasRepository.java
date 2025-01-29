package com.kevin.fastboard.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kevin.fastboard.entity.ListasEntity;

@Repository
public interface ListasRepository extends CrudRepository<ListasEntity, Integer> {

}
