package M1GIL.auth.Implementations.Controllers;

import M1GIL.auth.Implementations.Entities.Role;
import M1GIL.auth.Implementations.Entities.User;
import M1GIL.auth.Implementations.Models.UserRoleModel;
import M1GIL.auth.Interfaces.IControllers.IUserController;
import M1GIL.auth.Interfaces.IServices.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController implements IUserController {
    private final IUserService userService;

    @GetMapping(path = "/users/list")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping(path = "/users/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping(path = "/roles/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/roles/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping(path = "/roles/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody UserRoleModel userRole) {
        userService.addRoleToUser(userRole.getUsername(), userRole.getRoleName());
        return ResponseEntity.ok().build();
    }
}