package com.andrei.backend.repository;

import com.andrei.backend.model.Reteta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RetetaRepository extends JpaRepository<Reteta, Long> {
    List<Reteta> findAllByIngredientCantitateIngredientDenumire(String denumire);
}
