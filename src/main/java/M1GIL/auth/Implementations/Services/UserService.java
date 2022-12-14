package M1GIL.auth.Implementations.Services;

import M1GIL.auth.Implementations.Entities.Role;
import M1GIL.auth.Implementations.Entities.User;
import M1GIL.auth.Interfaces.IRepositories.IRoleRepo;
import M1GIL.auth.Interfaces.IRepositories.IUserRepo;
import M1GIL.auth.Interfaces.IServices.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service @Transactional @Slf4j
public class UserService implements IUserService, UserDetailsService
{
    @Autowired
    private IUserRepo userRepo;
    @Autowired
    private IRoleRepo roleRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public User saveUser(User user)
    {
        log.info("saved new user");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
    @Override
    public Role saveRole(Role role)
    {
        log.info("saved new role");
        return roleRepo.save(role);
    }    @Override
    public void addRoleToUser(String username, String roleName)
    {
        User user = userRepo.findByusername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }
    @Override
    public User getUser(String username)
    {
        return userRepo.findByusername(username);
    }
    @Override
    public List<User> getUsers()
    {
        return userRepo.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = userRepo.findByusername(username);
        if(user == null)
        {
            log.error("No user found !");
            throw new UsernameNotFoundException("User not found in the database !");
        }
        else
        {
            log.info("User found in the database ! : " + user.getUsername());
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(r -> authorities.add(new SimpleGrantedAuthority(r.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
    }
}
