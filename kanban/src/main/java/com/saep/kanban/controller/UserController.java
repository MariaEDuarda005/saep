package com.saep.kanban.controller;

import com.saep.kanban.dto.user.UserCreateDTO;
import com.saep.kanban.dto.user.UserDetailsDTO;
import com.saep.kanban.serviceImpl.UserServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/teste")
    public String hello(){
        return "Hello world";
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{idUser}")
    public ResponseEntity<UserDetailsDTO> getUserById(@PathVariable Long idUser){
        try {
            UserDetailsDTO userDetails = userServiceImpl.getById(idUser);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<UserDetailsDTO>> getAllUser(){
        List<UserDetailsDTO> users = userServiceImpl.getAllUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @Transactional
    public ResponseEntity<UserDetailsDTO> createUser(@RequestBody UserCreateDTO userCreateDTO, UriComponentsBuilder componentsBuilder){
        try {
            UserDetailsDTO user = userServiceImpl.createUser(userCreateDTO);
            var uri = componentsBuilder.path("/user/{id}").buildAndExpand(user.idUser()).toUri();
            return ResponseEntity.created(uri).body(user);
        } catch (Exception e) {
            e.printStackTrace();  // Isso ajudará a identificar o erro exato nos logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
