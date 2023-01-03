package com.andrei.backend.service;

import com.andrei.backend.model.Reteta;
import com.andrei.backend.repository.RetetaRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RetetaService {

    @Autowired
    private RetetaRepository retetaRepository;

    public List<Reteta> getAllRetete() {
        List<Reteta> retete = new ArrayList<>();
        retetaRepository.findAll().forEach(retete::add);
        return retete;
    }

    public void addReteta(Reteta reteta, HttpServletRequest request) {

        retetaRepository.save(reteta);
    }

    public Reteta getReteta(Long id) {
        return (Reteta) retetaRepository.findById(id).get();
    }


    public void updateReteta(Reteta reteta, HttpServletResponse response) {
        Reteta dBReteta = retetaRepository.findById(reteta.getId()).get();
        if(dBReteta.getAutor().getId() == reteta.getAutor().getId()) {
            retetaRepository.save(reteta);
            response.setStatus(200);
        }else {
            response.setStatus(403);
        }
    }


    public void deleteReteta(Long id) {
        retetaRepository.deleteById(id);
    }

    public List<Reteta> findByIngredient(String denumireIngredient){
     return retetaRepository.findAllByIngredientCantitateIngredientDenumire(denumireIngredient);
    }

}
