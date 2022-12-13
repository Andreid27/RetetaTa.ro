package com.andrei.backend.controller;

import com.andrei.backend.model.Ingredient;
import com.andrei.backend.service.IngredientService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static jakarta.servlet.http.HttpServletResponse.SC_CONFLICT;

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
    public String addIngredient(@RequestBody Ingredient ingredient, HttpServletResponse response){
        try {
            ingredientService.addIngredient(ingredient);
            return null;
        } catch (Exception exception){
            response.setStatus(SC_CONFLICT);
            return exception.getMessage();
        }
    }

    @PutMapping("/ingredient")
    public void updateIngredient(@RequestBody Ingredient ingredient){ingredientService.updateIngredient(ingredient);}

    @DeleteMapping("/ingredient/{id}")
    public void deleteIngredient(@PathVariable Long id) {ingredientService.deleteIngredient(id);}

}
