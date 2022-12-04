package com.andrei.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "ingredient_cantitate")
public class IngredientCantitate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Ingredient ingredient;

    @Column(name = "cantitate")
    private Integer cantitate;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.MERGE
            },
            mappedBy = "ingredientCantitate")
    private Set<Reteta> retete = new HashSet<>();


    public IngredientCantitate() {

    }
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Integer getCantitate() {
        return cantitate;
    }

    public void setCantitate(Integer cantitate) {
        this.cantitate = cantitate;
    }

    @JsonBackReference
    public Set<Reteta> getRetete() {
        return retete;
    }

    public void setTutorials(Set<Reteta> retetas) {
        this.retete = retetas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IngredientCantitate)) return false;
        IngredientCantitate that = (IngredientCantitate) o;
        return getId() == that.getId() && Objects.equals(getIngredient(), that.getIngredient()) && Objects.equals(getCantitate(), that.getCantitate()) && Objects.equals(retete, that.retete);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getIngredient(), getCantitate(), retete);
    }
}
