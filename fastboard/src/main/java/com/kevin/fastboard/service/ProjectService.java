package com.kevin.fastboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kevin.fastboard.entity.ProjectEntity;
import com.kevin.fastboard.entity.UsuarioEntity;
import com.kevin.fastboard.repository.ProjectRepository;
import com.kevin.fastboard.repository.UsuarioRepository;
import java.util.Collections;

@Service
public class ProjectService implements IProjectService {

    @Autowired
    private ProjectRepository projectRepository;

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

}
