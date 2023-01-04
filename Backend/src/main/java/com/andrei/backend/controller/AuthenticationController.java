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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
public class AuthenticationController {

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


        return ResponseEntity.ok(new AuthenticationResponese(access_token,refresh_token,user));
    }


    @GetMapping("/login")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String new_access_token = null;
        String new_refresh_token = null;
        User user = null;
        final String authHeader = request.getHeader(AUTHORIZATION);
        final String username;
        final String jwtToken;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwtToken = authHeader.substring(7);
            username = jwtTokenUtil.extractUsername(jwtToken);
            if (username != null && !jwtTokenUtil.isTokenExpired(jwtToken)) {
                user = (User) userService.loadUserByUsername(username);
                new_access_token = jwtTokenUtil.generateToken(user, 10);
                new_refresh_token = jwtTokenUtil.generateToken(user, 12 * 60);
            }
        }
        return ResponseEntity.ok("{\"access_token\":"+"\""+new_refresh_token+"\"}");
    }


    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody User user){
        try{
            userService.addUser(user);
            AuthenticationRequest authenticationRequest = new AuthenticationRequest(user.getUsername(), user.getPassword());
            return createAuthenticationToken(authenticationRequest);
        }
        catch (Exception exception){
            return ResponseEntity.status(409).build();
        }
    }



}
