package M1GIL.auth.Interfaces.IServices;

import M1GIL.auth.Implementations.Entities.Role;
import M1GIL.auth.Implementations.Entities.User;

import java.util.List;

public interface IUserService
{
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username,String roleName);
    User getUser(String username);
    List<User> getUsers();
}