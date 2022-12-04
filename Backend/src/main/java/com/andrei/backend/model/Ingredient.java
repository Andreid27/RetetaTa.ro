package com.andrei.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Ingredient {
    @Id
    @GeneratedValue
    @Column(unique = true)
    private int id;

    private String denumire;
    private String descriere;


    public Ingredient() {}

    public Ingredient(int id, String denumire, String descriere, List<Ingredient> ingredienteCantitate) {
        this.id = id;
        this.denumire = denumire;
        this.descriere = descriere;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

}
