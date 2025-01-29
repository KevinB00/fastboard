package com.kevin.fastboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.entity.ListasEntity;
import com.kevin.fastboard.entity.ProjectEntity;
import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.repository.ListasRepository;
import com.kevin.fastboard.repository.ProjectRepository;
import com.kevin.fastboard.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.Collections;

@Service
public class ProjectService implements IProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ListasRepository listasRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<ProjectEntity> getProjectsByUser(String email) {
        try{
        UsuarioEntity user = usuarioRepository.findByEmail(email);
        return projectRepository.findByUsuariocreador(user.getId());
        }catch(Exception e){
            return Collections.emptyList();
        }
    }

    @Override
    public ProjectEntity createProject(String email, String title, String description, LocalDate fechaFin) {
        try{
        UsuarioEntity user = usuarioRepository.findByEmail(email);
        ProjectEntity project = new ProjectEntity();
        project.setDescripcion(description);
        project.setTitulo(title);
        project.setUsuariocreador(user.getId());
        project.setFecha_inicio(LocalDate.now());
        project.setFecha_fin(fechaFin);
        return projectRepository.save(project);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public ProjectEntity getProjectById(Integer id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public ListasEntity createLista(String nombre, Integer idProyecto) {

        try{
        ListasEntity lista = new ListasEntity();
        lista.setNombre(nombre);
        lista.setProyectoid(idProyecto);
        return listasRepository.save(lista);
        }catch(Exception e){
            System.out.println(e);
            return null;
        }
    }

}
