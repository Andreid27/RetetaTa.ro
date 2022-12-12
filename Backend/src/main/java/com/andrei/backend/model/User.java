package com.andrei.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private long id;
    private String Nume;
    private String Prenume;
    private String username;
    private String mail;
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

    public void setUsername(String name) {
        this.username = username;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

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
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ADMIN"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }


}
