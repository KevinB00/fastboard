package com.kevin.fastboard.controller.tareas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
