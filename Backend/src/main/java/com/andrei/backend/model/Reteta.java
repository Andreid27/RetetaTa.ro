package com.andrei.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Reteta")
@NaturalIdCache
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reteta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true , nullable = false)
    private long id;
    @NaturalId
    @Column(name = "denumire", unique = true)
    private String denumire;

    @Column(name = "descriere")
    private String descriere;

    @ManyToOne
    @JoinColumn(name = "autor")
    private User autor;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "reteta_ingredient_cantitate",
            joinColumns = { @JoinColumn(name = "reteta_id") },
            inverseJoinColumns = { @JoinColumn(name = "ingredient_cantitate_id") })
    private Set<IngredientCantitate> ingredientCantitate = new HashSet<>();

    public Reteta() {}

    public Reteta(long id, String denumire, String descriere, User autor, Set<IngredientCantitate> ingredientCantitate) {
        this.id = id;
        this.denumire = denumire;
        this.descriere = descriere;
        this.autor = autor;
        this.ingredientCantitate = ingredientCantitate;
    }

// getters and setters


    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public Set<IngredientCantitate> getIngredientCantitate() {
        return ingredientCantitate;
    }

    public void setIngredientCantitate(Set<IngredientCantitate> ingredientCantitate) {
        this.ingredientCantitate = ingredientCantitate;
    }

    public void addTag(IngredientCantitate ingredientCantitate) {
        this.ingredientCantitate.add(ingredientCantitate);
        ingredientCantitate.getRetete().add(this);
    }

    public void removeTag(long tagId) {
        IngredientCantitate ingredientCantitate = this.ingredientCantitate.stream().filter(t -> t.getId() == tagId).findFirst().orElse(null);
        if (ingredientCantitate != null) {
            this.ingredientCantitate.remove(ingredientCantitate);
            ingredientCantitate.getRetete().remove(this);
        }
    }

}
