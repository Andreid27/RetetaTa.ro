package com.andrei.backend.model.securityModel;

public class AuthenticationResponese {
    private final String jwt;

    public AuthenticationResponese(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt(){
        return jwt;
    }
}
