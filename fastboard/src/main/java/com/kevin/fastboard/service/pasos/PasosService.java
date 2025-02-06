package com.kevin.fastboard.service.pasos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.controller.dto.PasoEstadoRequest;
import com.kevin.fastboard.controller.dto.PasoRequest;
import com.kevin.fastboard.entity.PasosEntity;
import com.kevin.fastboard.repository.PasosRepository;

@Service
public class PasosService implements IPasosService {

    @Autowired
    private PasosRepository pasosRepository;

    @Override
    public List<PasosEntity> crearPaso(PasoRequest nuevoPaso) {
        try {
            PasosEntity paso = new PasosEntity();
            paso.setNombre(nuevoPaso.getNombre());
            paso.setFecha_prevista(nuevoPaso.getFecha_prevista());
            paso.setTareaid(nuevoPaso.getTareaid());
            paso.setHecho(false);
            pasosRepository.save(paso);
            return getTareas(nuevoPaso.getTareaid());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<PasosEntity> getTareas(Integer id) {
        try {
            List<PasosEntity> pasos = pasosRepository.findByTareaid(id);
            // Ordenar los pasos por fecha prevista
            pasos.sort((p1, p2) -> p1.getFecha_prevista().compareTo(p2.getFecha_prevista()));
            return pasos;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public String completarPaso(Integer id, PasoEstadoRequest pasoActual) {
        try {
            String mensaje = "";
            List<PasosEntity> pasos = pasosRepository.findByTareaid(id);

            if (pasos.isEmpty()) {
                return "error";
            } else {
                pasos.sort((p1, p2) -> p1.getFecha_prevista().compareTo(p2.getFecha_prevista()));
                for (int i = 0; i < pasos.size(); i++) {
                    if (i < pasoActual.getIdHecho()) {
                        pasos.get(i).setHecho(true);
                        pasosRepository.save(pasos.get(i));
                        mensaje = "okey";
                    } else {
                        pasos.get(i).setHecho(false);
                        pasosRepository.save(pasos.get(i));
                        mensaje = "okey";
                    }
                }
            }
            return mensaje;

        } catch (Exception e) {
            return "error";
        }
    }

    @Override
    public List<PasosEntity> eliminarPaso(Integer id) {
        try {
            Integer tareaid = pasosRepository.findById(id).get().getTareaid();
            pasosRepository.deleteById(id);
            return getTareas(tareaid);
        } catch (Exception e) {
            return null;
        }

    }

}
