package com.kevin.fastboard.service.tareas;

import java.util.List;

import com.kevin.fastboard.controller.dto.TareaRequest;
import com.kevin.fastboard.entity.TareaEntity;

public interface ITareasService {

    TareaEntity createTarea(TareaRequest tarea);

    List<TareaEntity> getTareas(Integer id);

    TareaEntity updateTarea(Integer id, Integer listaId);

    boolean deleteTarea(Integer id);

    List<TareaEntity> getTareasUsuario(String username);

    TareaEntity marcarTarea(Integer id);

}
