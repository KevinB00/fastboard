package com.kevin.fastboard.controller.pasos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kevin.fastboard.controller.dto.PasoEstadoRequest;
import com.kevin.fastboard.controller.dto.PasoRequest;
import com.kevin.fastboard.entity.PasosEntity;
import com.kevin.fastboard.service.pasos.IPasosService;

import utils.JwtUtils;

@RestController
@RequestMapping("/pasos")
public class PasosController {

    @Autowired
    private IPasosService pasosService;

    @Autowired
    private JwtUtils jwtUtil;

    @PostMapping("/create")
    public ResponseEntity<List<PasosEntity>> crearPaso(@RequestHeader("Authorization") String token,
            @RequestBody PasoRequest nuevoPaso)
            throws Exception {

        List<PasosEntity> pasoCreado = pasosService.crearPaso(nuevoPaso);

        if (pasoCreado == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(pasoCreado);
        }
    }

    @GetMapping("/tarea/{id}")
    public ResponseEntity<List<PasosEntity>> getTareas(@RequestHeader("Authorization") String token,
            @PathVariable Integer id) throws Exception {
        List<PasosEntity> pasos = pasosService.getTareas(id);
        if (pasos.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(pasos);
        }
    }

    @PutMapping("/estado/{id}")
    public ResponseEntity<String> completarPaso(@RequestHeader("Authorization") String token, @PathVariable Integer id,
            @RequestBody PasoEstadoRequest pasoActual)
            throws Exception {

        String mensaje = pasosService.completarPaso(id, pasoActual);

        if (!mensaje.equals("error") && !mensaje.equals("")) {
            return ResponseEntity.ok(mensaje);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<List<PasosEntity>> eliminarPaso(@RequestHeader("Authorization") String token, @PathVariable Integer id)
            throws Exception {
        List<PasosEntity> pasos = pasosService.eliminarPaso(id);

        if (pasos == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(pasos);
        }
    }
}