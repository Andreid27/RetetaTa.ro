package com.andrei.backend.service;

import com.andrei.backend.model.User;
import com.andrei.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    public User getUserById(Long id){
        User user = userRepository.findById(id).get();
        return user;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addUser(User user){
        userRepository.save(user);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: "+ username));
        return user.map(User::new).get();
    }
}
