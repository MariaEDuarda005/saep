package com.saep.kanban.service;

import com.saep.kanban.dto.user.UserCreateDTO;
import com.saep.kanban.dto.user.UserDetailsDTO;

import java.util.List;

public interface UserService {

    UserDetailsDTO getById(Long idUser);
    List<UserDetailsDTO> getAllUser();
    UserDetailsDTO createUser(UserCreateDTO data);

}
