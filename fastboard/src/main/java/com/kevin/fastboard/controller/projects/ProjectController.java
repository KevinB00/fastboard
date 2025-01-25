package com.kevin.fastboard.controller.projects;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
