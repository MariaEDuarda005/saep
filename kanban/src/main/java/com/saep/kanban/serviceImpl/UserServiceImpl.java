package com.saep.kanban.serviceImpl;

import com.saep.kanban.dto.user.UserCreateDTO;
import com.saep.kanban.dto.user.UserDetailsDTO;
import com.saep.kanban.infra.exception.NotFoundException;
import com.saep.kanban.models.User;
import com.saep.kanban.repository.UserRepository;
import com.saep.kanban.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetailsDTO getById(Long idUser) {
        User user = this.userRepository.findById(idUser)
                .orElseThrow(() -> new NotFoundException("User id not found"));
        return new UserDetailsDTO(
                user.getIdUser(),
                user.getNome(),
                user.getEmail()
        );
    }

    @Override
    public List<UserDetailsDTO> getAllUser() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDetailsDTO(
                        user.getIdUser(),
                        user.getNome(),
                        user.getEmail()
                )).collect(Collectors.toList());
    }

    @Override
    public UserDetailsDTO createUser(UserCreateDTO data) {
        User user = new User(data);
        user = userRepository.save(user);
        return new UserDetailsDTO(user);
    }
}
