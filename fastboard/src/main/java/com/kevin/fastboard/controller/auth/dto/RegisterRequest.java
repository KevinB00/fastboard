package com.kevin.fastboard.controller.auth.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String lastName;
    private String email;
    private String password;
}
