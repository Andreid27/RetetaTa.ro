package com.andrei.backend.controller;

import com.andrei.backend.model.Reteta;
import com.andrei.backend.model.User;
import com.andrei.backend.service.RetetaService;
import com.andrei.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
public class RetetaController {

    @Autowired
    RetetaService retetaService;

    @Autowired
    UserService userService;

    @GetMapping("/retete")
    public List<Reteta> getAllRetete() {
        return retetaService.getAllRetete();
    }

    @GetMapping("/reteta/{id}")
    public Reteta getReteta(@PathVariable Long id){
        return retetaService.getReteta(id);
    }

    @PostMapping("/reteta")
    public void addReteta(@RequestBody Reteta reteta, HttpServletRequest request){
        String authHeader = request.getHeader(AUTHORIZATION);
        User user = userService.getMyUser(authHeader);
        reteta.setAutor(user);
        retetaService.addReteta(reteta, request);
    }

    @PutMapping("/reteta")
    public void updateReteta(@RequestBody Reteta reteta, HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader(AUTHORIZATION);
        User user = userService.getMyUser(authHeader);
        reteta.setAutor(user);
        retetaService.updateReteta(reteta, response);
    }

    @DeleteMapping("/reteta/{id}")
    public void deleteReteta(@PathVariable Long id){
        retetaService.deleteReteta(id);
    }

    @GetMapping("/reteta-contine/{ingredient}")
    public List<Reteta> getReteta(@PathVariable String ingredient){
        return retetaService.findByIngredient(ingredient);
    }


}
