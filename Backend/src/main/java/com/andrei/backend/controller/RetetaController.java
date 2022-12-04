package com.andrei.backend.controller;

import com.andrei.backend.model.Reteta;
import com.andrei.backend.service.RetetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RetetaController {

    @Autowired
    RetetaService retetaService;

    @GetMapping("/retete")
    public List<Reteta> getAllRetete() {
        return retetaService.getAllRetete();
    }

    @GetMapping("/reteta/{id}")
    public Reteta getReteta(@PathVariable Long id){
        return retetaService.getReteta(id);
    }

    @PostMapping("/reteta")
    public void addReteta(@RequestBody Reteta reteta){
        retetaService.addReteta(reteta);
    }

    @PutMapping("/reteta")
    public void updateReteta(@RequestBody Reteta reteta) {
        retetaService.updateReteta(reteta);
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
