package com.andrei.backend.service;

import com.andrei.backend.model.Reteta;
import com.andrei.backend.repository.RetetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RetetalService {

    @Autowired
    private RetetaRepository retetaRepository;

    public List<Reteta> getAllRetete() {
        List<Reteta> retete = new ArrayList<>();
        retetaRepository.findAll().forEach(retete::add);
        return retete;
    }

    public void addReteta(Reteta reteta) {retetaRepository.save(reteta);}



}
