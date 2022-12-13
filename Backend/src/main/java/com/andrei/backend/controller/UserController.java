package com.andrei.backend.controller;

import com.andrei.backend.model.User;
import com.andrei.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static jakarta.servlet.http.HttpServletResponse.SC_CONFLICT;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers(){
            return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id){
        return userService.getUserById(id);
    }


    @PostMapping("/user")
    public String addIngredient(@RequestBody User user, HttpServletResponse response){
        try {
            userService.addUser(user);
            return null;
        } catch (Exception exception){
            response.setStatus(SC_CONFLICT);
            return exception.getMessage();
        }
    }

}
