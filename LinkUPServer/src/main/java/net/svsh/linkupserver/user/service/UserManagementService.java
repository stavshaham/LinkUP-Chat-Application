package net.svsh.linkupserver.user.service;

import net.svsh.linkupserver.dto.RequestResponse;
import net.svsh.linkupserver.security.jwt.JWTUtils;
import net.svsh.linkupserver.user.User;
import net.svsh.linkupserver.user.UserRepository;
import net.svsh.linkupserver.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RequestResponse register(RequestResponse registerRequest) {
        RequestResponse registerResponse = new RequestResponse();

        try {
            System.err.println("Can get here!");
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setUsername(registerRequest.getUsername());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setRoles(registerRequest.getRoles());
            System.err.println(user.getEmail() + " " + user.getPassword() + " " + user.getUsername() + " " + user.getRoles());
            User user2 = userRepository.save(user);
            if (user.getId() > 0) {
                System.err.println("Works");
                registerResponse.setUser(user2);
                registerResponse.setStatusCode(200);
                registerResponse.setMessage("User registered successfully");
            }
        } catch (Exception e) {
            registerResponse.setStatusCode(500);
            registerResponse.setError(e.getMessage());
        }

        return registerResponse;
    }

    public RequestResponse login(RequestResponse loginRequest) {
        RequestResponse loginResponse = new RequestResponse();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                    loginRequest.getPassword()));

            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var token = jwtUtils.generateToken(user);
            var refreshedToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            loginResponse.setStatusCode(200);
            loginResponse.setToken(token);
            loginResponse.setRefreshToken(refreshedToken);
            loginResponse.setExpirationTime("24 Hours");
            loginResponse.setMessage("User logged in successfully");
        } catch (Exception e) {
            loginResponse.setStatusCode(500);
            loginResponse.setError(e.getMessage());
        }

        return loginResponse;
    }

    public RequestResponse refreshToken(RequestResponse refreshRequest) {
        RequestResponse refreshResponse = new RequestResponse();

        try {
            String email = jwtUtils.extractUsername(refreshRequest.getToken());
            User user = userRepository.findByEmail(email).orElseThrow();

            if (jwtUtils.validateToken(refreshRequest.getToken(), user)) {
                var token = jwtUtils.generateToken(user);
                refreshResponse.setStatusCode(200);
                refreshResponse.setToken(token);
                refreshResponse.setRefreshToken(refreshRequest.getRefreshToken());
                refreshResponse.setExpirationTime("24 Hours");
                refreshResponse.setMessage("User refreshed successfully");
            }
        } catch (Exception e) {
            refreshResponse.setStatusCode(500);
            refreshResponse.setError(e.getMessage());
        }

        return refreshResponse;
    }

    public RequestResponse getAllUsers() {
        RequestResponse allUsers = new RequestResponse();

        try {
            List<User> users = userRepository.findAll();
            if (!users.isEmpty()) {
                allUsers.setUsers(users);
                allUsers.setStatusCode(200);
                allUsers.setMessage("All users successfully");
            } else {
                allUsers.setStatusCode(404);
                allUsers.setMessage("No users found");
            }
        } catch (Exception e) {
            allUsers.setStatusCode(500);
            allUsers.setError(e.getMessage());
        }

        return allUsers;
    }

    public RequestResponse getUserById(int id) {
        RequestResponse userResponse = new RequestResponse();

        try {
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("No user found"));
            userResponse.setStatusCode(200);
            userResponse.setUser(user);
            userResponse.setMessage("User with ID " + id + " successfully found");
        } catch (Exception e) {
            userResponse.setStatusCode(500);
            userResponse.setError(e.getMessage());
        }

        return userResponse;
    }

    public RequestResponse deleteUser(int userId) {
        RequestResponse deleteResponse = new RequestResponse();

        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                userRepository.deleteById(userId);
                deleteResponse.setStatusCode(200);
                deleteResponse.setMessage("User with ID " + userId + " successfully deleted");
            } else {
                deleteResponse.setStatusCode(404);
                deleteResponse.setMessage("No user found");
            }
        } catch (Exception e) {
            deleteResponse.setStatusCode(500);
            deleteResponse.setError(e.getMessage());
        }

        return deleteResponse;
    }

    public RequestResponse updateUser(int userId, User updatedUser) {
        RequestResponse updateResponse = new RequestResponse();

        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                User existingUser = user.get();
                existingUser.setUsername(updatedUser.getUsername());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setPassword(updatedUser.getPassword());
                existingUser.setRoles(updatedUser.getRoles());

                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = userRepository.save(existingUser);
                updateResponse.setUser(savedUser);
                updateResponse.setStatusCode(200);
                updateResponse.setMessage("User with ID " + userId + " successfully updated");
            } else {
                updateResponse.setStatusCode(404);
                updateResponse.setMessage("No user found");
            }
        } catch (Exception e) {
            updateResponse.setStatusCode(500);
            updateResponse.setError(e.getMessage());
        }

        return updateResponse;
    }

    public RequestResponse getInfo(String email) {
        RequestResponse infoResponse = new RequestResponse();

        try {
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                infoResponse.setUser(user.get());
                infoResponse.setStatusCode(200);
                infoResponse.setMessage("User with email " + email + " successfully found");
            } else {
                infoResponse.setStatusCode(404);
                infoResponse.setMessage("No user found");
            }
        } catch (Exception e) {
            infoResponse.setStatusCode(500);
            infoResponse.setError(e.getMessage());
        }

        return infoResponse;
    }

}
