package com.andrei.backend.controller;

import com.andrei.backend.model.Reteta;
import com.andrei.backend.service.RetetalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RetetaComtroller {

    @Autowired
    RetetalService retetalService;

    @GetMapping("/retete")
    public List<Reteta> getAllRetete() {
        return retetalService.getAllRetete();
    }

//    @GetMapping("/tutorials/{id}")
//    public ResponseEntity<Reteta> getTutorialById(@PathVariable("id") long id) {
//        Reteta tutorial = (Reteta) retetaRepository.findById(id);
//
//        return new ResponseEntity<>(tutorial, HttpStatus.OK);
//    }

    @PostMapping("/retete")
    public void addReteta(@RequestBody Reteta reteta){
        retetalService.addReteta(reteta);
    }
    



}
