package com.andrei.backend.controller;

import com.andrei.backend.model.Ingredient;
import com.andrei.backend.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IngredientController {

    @Autowired
    IngredientService ingredientService;

    @GetMapping("/ingrediente")
    private List<Ingredient> ingrediente(){return ingredientService.getAllIngrediente();}

    @GetMapping("/ingredient/{id}")
    public Ingredient getIngredient(@PathVariable Long id){
        return ingredientService.getIngredient(id);
    }

    @PostMapping("/ingredient")
    public void addIngredient(@RequestBody Ingredient ingredient){ingredientService.addIngredient(ingredient);}

    @PutMapping("/ingredient")
    public void updateIngredient(@RequestBody Ingredient ingredient){ingredientService.updateIngredient(ingredient);}

    @DeleteMapping("/ingredient/{id}")
    public void deleteIngredient(@PathVariable Long id) {ingredientService.deleteIngredient(id);}

}
