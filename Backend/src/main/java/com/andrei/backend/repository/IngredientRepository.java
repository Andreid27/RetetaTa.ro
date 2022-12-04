package com.andrei.backend.repository;

import com.andrei.backend.model.IngredientCantitate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<IngredientCantitate, Long> {
}
