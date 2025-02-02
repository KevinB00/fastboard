package com.kevin.fastboard.service.tareas;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.controller.dto.TareaRequest;
import com.kevin.fastboard.entity.TareaEntity;
import com.kevin.fastboard.repository.TareasRepository;

@Service
public class TareasService implements ITareasService {

    @Autowired
    private TareasRepository tareasRepository;

    @Override
    public TareaEntity createTarea(TareaRequest tarea) {
        try {
            TareaEntity nuevaTarea = new TareaEntity();
            nuevaTarea.setNombre(tarea.getNombre());
            nuevaTarea.setDescripcion(tarea.getDescripcion());
            if (tarea.getFechaInicio() != null) {
                nuevaTarea.setFecha_inicio(tarea.getFechaInicio());
            }else{
                nuevaTarea.setFecha_inicio(LocalDate.now());
            }
            nuevaTarea.setFecha_fin(tarea.getFechaFin());
            nuevaTarea.setEtiquetas(tarea.getEtiquetas());
            nuevaTarea.setListaid(tarea.getIdLista());
            return tareasRepository.save(nuevaTarea);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<TareaEntity> getTareas(Integer id) {
        try{
            return tareasRepository.findByListaid(id);
        }catch(Exception e){
            return null;
        }
    }

}
