package com.andrei.backend.controller;

import com.andrei.backend.model.Reteta;
import com.andrei.backend.service.RetetalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RetetaController {

    @Autowired
    RetetalService retetalService;

    @GetMapping("/retete")
    public List<Reteta> getAllRetete() {
        return retetalService.getAllRetete();
    }

    @GetMapping("/reteta/{id}")
    public Reteta getReteta(@PathVariable Long id){
        return retetalService.getReteta(id);
    }

    @PostMapping("/retete")
    public void addReteta(@RequestBody Reteta reteta){
        retetalService.addReteta(reteta);
    }






}
