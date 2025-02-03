package com.kevin.fastboard.service.pasos;

import java.util.List;

import com.kevin.fastboard.controller.dto.PasoRequest;
import com.kevin.fastboard.entity.PasosEntity;

public interface IPasosService {

    PasosEntity crearPaso(PasoRequest nuevoPaso);

    List<PasosEntity> getTareas(Integer id);

    String completarPaso(Integer id);

}
