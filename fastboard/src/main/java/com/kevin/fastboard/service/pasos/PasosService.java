package com.kevin.fastboard.service.pasos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.controller.dto.PasoRequest;
import com.kevin.fastboard.entity.PasosEntity;
import com.kevin.fastboard.repository.PasosRepository;

@Service
public class PasosService implements IPasosService {

    @Autowired
    private PasosRepository pasosRepository;

    @Override
    public PasosEntity crearPaso(PasoRequest nuevoPaso) {
        try{
            PasosEntity paso = new PasosEntity();
            paso.setNombre(nuevoPaso.getNombre());
            paso.setFecha_prevista(nuevoPaso.getFecha_prevista());
            paso.setTareaid(nuevoPaso.getTareaid());
            paso.setHecho(false);
            return pasosRepository.save(paso);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public List<PasosEntity> getTareas(Integer id) {
        try{
            return pasosRepository.findByTareaid(id);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public String completarPaso(Integer id) {
        try{
            String mensaje;
            PasosEntity paso = pasosRepository.findById(id).orElse(null);
            if (paso.getHecho()) {
                paso.setHecho(false);
                mensaje = "false";
            } else {
                paso.setHecho(true);
                mensaje = "true";
            }
            pasosRepository.save(paso);
            return mensaje;
        }catch(Exception e){
            return "error";
        }
    }

}
