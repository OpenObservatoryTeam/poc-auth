package M1GIL.auth.Implementations.Services;

import M1GIL.auth.Implementations.Dto.LoginDto;
import M1GIL.auth.Implementations.Dto.SignupDto;
import M1GIL.auth.Implementations.Entities.User;
import M1GIL.auth.Implementations.Models.LoginModel;
import M1GIL.auth.Implementations.Models.SignupModel;
import M1GIL.auth.Interfaces.IRepositories.IUserRepo;
import M1GIL.auth.Interfaces.IServices.IAuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service @Transactional @Slf4j
public class AuthService implements IAuthService
{
    @Autowired
    private IUserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public LoginDto Login(LoginModel loginModel)
    {
        LoginDto loginDto = new LoginDto();
        User user = userRepo.findByusername(loginModel.getUsername());

        if(user == null || !passwordEncoder.matches(loginModel.getPassword(), user.getPassword()))
            return null;

        loginDto.setId(user.getId());
        loginDto.setUsername(user.getUsername());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

        String accesToken = JWT.create()
                .withSubject(loginModel.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 + 60 * 1000))
                //.withIssuer(request.getRequestURL().toString())
                //.withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        loginDto.setAuthToken(accesToken);

        String refreshToken = JWT.create()
                .withSubject(loginModel.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 + 60 * 1000))
                //.withIssuer(request.getRequestURL().toString())
                //.withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        loginDto.setRefreshToken(refreshToken);
        loginDto.setCreationDate(user.getCreationDate());
        log.info(loginDto.toString());
        return loginDto;
    }

    @Override
    public SignupDto Signup(SignupModel signupModel)
    {
        if(userRepo.findByusername(signupModel.getUsername()) != null)
            return null;

        User user = new User();
        user.setPassword(passwordEncoder.encode(signupModel.getPassword()));
        user.setUsername(signupModel.getUsername());
        user.setFirstName(signupModel.getFirstName());
        user.setLastName(signupModel.getLastName());
        user.setCreationDate(new Date(System.currentTimeMillis()));
        userRepo.save(user);

        SignupDto signupDto = new SignupDto();
        signupDto.setUsername(signupModel.getUsername());
        signupDto.setId(user.getId());
        signupDto.setCreationDate(user.getCreationDate());
        signupDto.setLastName(signupModel.getLastName());
        signupDto.setFirstName(signupModel.getFirstName());
        return signupDto;
    }
}