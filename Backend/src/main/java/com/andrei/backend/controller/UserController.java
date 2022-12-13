package com.andrei.backend.controller;

import com.andrei.backend.model.User;
import com.andrei.backend.model.securityModel.AuthenticationRequest;
import com.andrei.backend.model.securityModel.AuthenticationResponese;
import com.andrei.backend.security.jwt.JwtUtil;
import com.andrei.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Controller
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final User user = (User) userService.loadUserByUsername(authenticationRequest.getUsername());
        final String access_token = jwtTokenUtil.generateToken(user,1);
        final String refresh_token = jwtTokenUtil.generateToken(user,12*60);


        return ResponseEntity.ok(new AuthenticationResponese(access_token,refresh_token));
    }


    @GetMapping("/login")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String new_access_token = null;
        String new_refresh_token = null;
        try {
        final String authHeader = request.getHeader(AUTHORIZATION);
        final String username;
        final String jwtToken;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwtToken = authHeader.substring(7);
            username = jwtTokenUtil.extractUsername(jwtToken);
            if (username != null && !jwtTokenUtil.isTokenExpired(jwtToken)) {
                User user = (User) userService.loadUserByUsername(username);
                new_access_token = jwtTokenUtil.generateToken(user, 10);
                new_refresh_token = jwtTokenUtil.generateToken(user, 12*60);
            }
            else{
                Exception exception = new Exception();
                throw exception;
            }
        }

    } catch (Exception e){
            response.setHeader("error", e.getMessage());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            Map<String,String> error = new HashMap();
            error.put("Error message", e.getMessage());
            return ResponseEntity.of(Optional.of(response));
        }
        return ResponseEntity.ok(new AuthenticationResponese(new_access_token,new_refresh_token));
    }
}
