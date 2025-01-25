package com.kevin.fastboard.service;

import java.util.List;

import com.kevin.fastboard.entity.ProjectEntity;

public interface IProjectService {

    List<ProjectEntity> getProjectsByUser(String email);

}
