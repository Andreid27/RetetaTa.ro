package com.andrei.backend.service;

import com.andrei.backend.model.Ingredient;
import com.andrei.backend.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IngredientService {

        @Autowired
        private IngredientRepository ingredientRepository;

        public List<Ingredient> getAllIngrediente() {
            List<Ingredient> ingrediente = new ArrayList<>();
            ingredientRepository.findAll().forEach(ingrediente::add);
            return ingrediente;
        }

        public void addIngredient(Ingredient ingredient) {ingredientRepository.save(ingredient);}

        public Ingredient getIngredient(Long id) {
            return (Ingredient) ingredientRepository.findById(id).get();
        }


        public void updateIngredient(Ingredient ingredient) {
            ingredientRepository.save(ingredient);
        }


        public void deleteIngredient(Long id) {
            ingredientRepository.deleteById(id);
        }

}
