package net.svsh.linkupserver.user.controller;

import net.svsh.linkupserver.dto.RequestResponse;
import net.svsh.linkupserver.user.User;
import net.svsh.linkupserver.user.UserRepository;
import net.svsh.linkupserver.user.service.UserManagementService;
import net.svsh.linkupserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserManagementService userManagementService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "api/auth/register", method = RequestMethod.POST)
    public ResponseEntity<RequestResponse> register(@RequestBody RequestResponse registerRequest) {
        return ResponseEntity.ok(userManagementService.register(registerRequest));
    }

    @RequestMapping(value = "api/auth/login", method = RequestMethod.POST)
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse loginRequest) {
        return ResponseEntity.ok(userManagementService.login(loginRequest));
    }

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public ResponseEntity<RequestResponse> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @RequestMapping(value = "api/auth/refreshToken", method = RequestMethod.POST)
    public ResponseEntity<RequestResponse> refreshToken(@RequestBody RequestResponse refreshTokenRequest) {
        return ResponseEntity.ok(userManagementService.refreshToken(refreshTokenRequest));
    }

    @RequestMapping(value = "api/users/{userId}/get", method = RequestMethod.GET)
    public ResponseEntity<RequestResponse> getUserById(@PathVariable int userId) {
        return ResponseEntity.ok(userManagementService.getUserById(userId));
    }

    @RequestMapping(value = "api/users/{userId}/update", method = RequestMethod.PUT)
    public ResponseEntity<RequestResponse> updateUserById(@PathVariable int userId, @RequestBody User updateRequest) {
//        return ResponseEntity.ok(userManagementService.updateUser(userId, updateRequest));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && user.getId() == userId) {
            return ResponseEntity.ok(userManagementService.updateUser(userId, updateRequest));
        } else if (user == null) {
            RequestResponse response = new RequestResponse();
            response.setStatusCode(404);
            response.setMessage("User not found");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        RequestResponse response = new RequestResponse();
        response.setStatusCode(500);
        response.setMessage("Could not update user");
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @RequestMapping(value = "api/users/{userId}", method = RequestMethod.GET)
    public ResponseEntity<RequestResponse> getUserInformation(@PathVariable int userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        RequestResponse response = userManagementService.getInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @RequestMapping(value = "api/users/{userId}/delete", method = RequestMethod.DELETE)
    public ResponseEntity<RequestResponse> deleteUser(@PathVariable int userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && user.getId() == userId) {
            return ResponseEntity.ok(userManagementService.deleteUser(userId));
        } else if (user == null) {
            RequestResponse response = new RequestResponse();
            response.setStatusCode(404);
            response.setMessage("User not found");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        RequestResponse response = new RequestResponse();
        response.setStatusCode(500);
        response.setMessage("Could not delete user");
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}
