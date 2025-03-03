package com.kevin.fastboard.controller.tareas;

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

import com.kevin.fastboard.controller.dto.NuevaListaRequest;
import com.kevin.fastboard.controller.dto.TareaRequest;
import com.kevin.fastboard.entity.TareaEntity;
import com.kevin.fastboard.service.tareas.ITareasService;

import utils.JwtUtils;

@RestController
@RequestMapping("/tareas")
public class TareasController {

    @Autowired
    private ITareasService tareasService;

    @Autowired
    private JwtUtils jwtUtil;

    @PostMapping("/create")
    public ResponseEntity<TareaEntity> createTarea(@RequestHeader("Authorization") String token,
            @RequestBody TareaRequest tarea) throws Exception {
        TareaEntity nuevaTarea = tareasService.createTarea(tarea);

        if (nuevaTarea == null) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(nuevaTarea);
        }
    }

    @GetMapping("/lista/{id}")
    public ResponseEntity<List<TareaEntity>> getTareas(@RequestHeader("Authorization") String token,
            @PathVariable Integer id) throws Exception {
        List<TareaEntity> tareas = tareasService.getTareas(id);
        if (tareas.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(tareas);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TareaEntity> updateTarea(@RequestHeader("Authorization") String token, @PathVariable Integer id, @RequestBody NuevaListaRequest listaId) throws Exception {
        TareaEntity tarea = tareasService.updateTarea(id, listaId.getListaid());
        if (tarea == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(tarea);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteTarea(@RequestHeader("Authorization") String token, @PathVariable Integer id) throws Exception {
        if (tareasService.deleteTarea(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
