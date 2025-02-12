package com.kevin.fastboard.service;

import java.time.LocalDate;
import java.util.List;

import com.kevin.fastboard.entity.ProjectEntity;

public interface IProjectService {

    List<ProjectEntity> getProjectsByUser(String email);

    ProjectEntity createProject(String email, String title, String description, LocalDate fechaFin);

}
