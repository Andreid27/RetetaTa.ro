package com.andrei.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private int id;
    @Column(unique = true)
    private String denumire;
    private String descriere;

    @ManyToOne
    private User autor;


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


    public User getAutor() {
        return autor;
    }

    public void setAutor(User autor) {
        this.autor = autor;
    }
}
