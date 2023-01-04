package com.andrei.backend.controller;

import com.andrei.backend.model.User;
import com.andrei.backend.model.securityModel.AuthenticationResponese;
import com.andrei.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static jakarta.servlet.http.HttpServletResponse.SC_CONFLICT;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers(){
            return userService.getAllUsers();
    }

    @GetMapping("/user")
    public ResponseEntity<AuthenticationResponese> getMyUser(HttpServletRequest request){
        String authHeader = request.getHeader(AUTHORIZATION);
        User user = userService.getMyUser(authHeader);
        return ResponseEntity.ok(new AuthenticationResponese(authHeader,authHeader,user));
    }


    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }


    @PostMapping("/user")
    public String addUser(@RequestBody User user, HttpServletResponse response){
        try {
            userService.addUser(user);
            return null;
        } catch (Exception exception){
            response.setStatus(SC_CONFLICT);
            return exception.getMessage();
        }
    }

}
