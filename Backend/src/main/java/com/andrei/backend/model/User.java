package com.andrei.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String Nume;
    private String Prenume;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    @Column(unique = true)
    private String mail;
    @Column(unique = true)
    private String phoneNumber;
    private String password;
    private Boolean active;


    public User() {}

    public User(String username) {
        this.username = username;
    }

    public User(User user){
        this.username=user.getUsername();
        this.Nume = user.getNume();
        this.Prenume = user.getPrenume();
        this.username = user.getUsername();
        this.mail = user.getMail();
        this.phoneNumber = user.getPhoneNumber();
        this.password = user.getPassword();

    }

    public User(long id, String username) {
        this.id = id;
        this.username = username;
    }

    public User(long id, String nume, String prenume, String username, String mail, String phoneNumber, String password) {
        this.id = id;
        this.Nume = nume;
        this.Prenume = prenume;
        this.username = username;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
    public User(String nume, String prenume, String username, String mail, String phoneNumber, String password) {
        this.Nume = nume;
        this.Prenume = prenume;
        this.username = username;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // este nevoie pentru a autoriza update-ul
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getMail() {
        return mail;
    }
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // este nevoie pentru a autoriza update-ul
    public void setMail(String mail) {
        this.mail = mail;
    }
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // este nevoie pentru a autoriza update-ul
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // este nevoie pentru a autoriza update-ul
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNume() {
        return Nume;
    }

    public void setNume(String nume) {
        Nume = nume;
    }

    public String getPrenume() {
        return Prenume;
    }

    public void setPrenume(String prenume) {
        Prenume = prenume;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public boolean isEnabled() {
        return true;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }


}
