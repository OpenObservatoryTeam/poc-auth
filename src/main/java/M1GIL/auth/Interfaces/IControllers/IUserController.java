package M1GIL.auth.Interfaces.IControllers;

import M1GIL.auth.Implementations.Entities.Role;
import M1GIL.auth.Implementations.Entities.User;
import M1GIL.auth.Implementations.Models.UserRoleModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserController
{
    ResponseEntity<List<User>> getUsers();
    ResponseEntity<User>saveUser(User user);
    ResponseEntity<Role>saveRole(Role role);
    ResponseEntity<?>addRoleToUser(UserRoleModel userRole);
}
