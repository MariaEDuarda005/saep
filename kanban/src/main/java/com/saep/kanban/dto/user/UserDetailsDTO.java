package com.saep.kanban.dto.user;

import com.saep.kanban.models.User;

public record UserDetailsDTO(Long idUser, String nome, String email) {
    public UserDetailsDTO(User user) {
        this(user.getIdUser(), user.getNome(), user.getEmail());
    }
}
