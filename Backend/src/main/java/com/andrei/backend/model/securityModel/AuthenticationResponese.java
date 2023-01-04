package com.andrei.backend.model.securityModel;

import com.andrei.backend.model.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class AuthenticationResponese {
    private String role="admin";
    private Map<String,Object> data = new HashMap<>();

    public AuthenticationResponese(String access_token, String refresh_token, User user) {
        data.put("access_token", access_token);
        data.put("refresh_token", refresh_token);
        data.put("displayName", user.getUsername());
        data.put("shortcuts", new ArrayList());
        data.put("email",user.getMail());
        data.put("nume", user.getNume());
        data.put("prenume", user.getPrenume());
    }


    public AuthenticationResponese(String access_token,String refresh_token) {
        data.put("access_token", access_token);
        data.put("refresh_token", refresh_token);
    }

    public String getRole() {
        return role;
    }

    public Map<String, Object> getData() {
        return data;
    }
}
