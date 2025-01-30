package com.kevin.fastboard.controller.projects;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kevin.fastboard.controller.auth.dto.CreateProjectRequest;
import com.kevin.fastboard.controller.auth.dto.ListaRequest;
import com.kevin.fastboard.entity.ListasEntity;
import com.kevin.fastboard.entity.ProjectEntity;
import com.kevin.fastboard.service.IProjectService;

import utils.JwtUtils;



@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private IProjectService projectService;

    @Autowired
    private JwtUtils jwtUtil;

    @GetMapping("/user")
    public ResponseEntity<List<ProjectEntity>> getUserProjects(@RequestHeader("Authorization") String token) {

        String email = jwtUtil.extractUsername(token.substring(7));
        List<ProjectEntity> projects = projectService.getProjectsByUser(email);
        if (projects.isEmpty()) {
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(projects);
        }    }

    @PostMapping("/create")
    public ResponseEntity<ProjectEntity> createProject(@RequestHeader("Authorization") String token, @RequestBody CreateProjectRequest createProjectRequest) throws Exception {

        String email = jwtUtil.extractUsername(token.substring(7));
        ProjectEntity project = projectService.createProject(email, createProjectRequest.getTitle(), createProjectRequest.getDescription(), createProjectRequest.getFechaFin());
        if (project == null) {
            return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok(project);
        }
        
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<ProjectEntity> getDatosProyecto(@RequestHeader("Authorization") String token, @PathVariable Integer id) throws Exception {

        ProjectEntity project = projectService.getProjectById(id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(project);
        }
    }

    @PostMapping("/lista/create")
    public ResponseEntity<ListasEntity> createLista(@RequestHeader("Authorization") String token, @RequestBody ListaRequest lista) throws Exception {
        ListasEntity listaCreada = projectService.createLista(lista.getNombre(), lista.getIdProyecto());
        if (listaCreada == null) {
            return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok(listaCreada);
        }
    }

    @GetMapping("/listas/{id}")
    public ResponseEntity<List<ListasEntity>> getListas(@RequestHeader("Authorization") String token, @PathVariable Integer id) throws Exception {
        List<ListasEntity> listas = projectService.getListas(id);
        if (listas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(listas);
        }
    }

}
