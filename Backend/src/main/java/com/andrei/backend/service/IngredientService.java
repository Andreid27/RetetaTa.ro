package com.andrei.backend.service;

import com.andrei.backend.model.Ingredient;
import com.andrei.backend.model.User;
import com.andrei.backend.repository.IngredientRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
public class IngredientService {

        @Autowired
        private IngredientRepository ingredientRepository;

        @Autowired
        private UserService userService;

        public List<Ingredient> getAllIngrediente() {
            List<Ingredient> ingrediente = new ArrayList<>();
            ingredientRepository.findAll().forEach(ingrediente::add);
            return ingrediente;
        }

        public void addIngredient(Ingredient ingredient, HttpServletRequest request) {
            String authHeader = request.getHeader(AUTHORIZATION);
            User user = userService.getMyUser(authHeader);
            ingredient.setAutor(user);
            ingredientRepository.save(ingredient);
        }

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
