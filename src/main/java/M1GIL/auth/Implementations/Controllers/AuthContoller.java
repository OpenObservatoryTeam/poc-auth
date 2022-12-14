package M1GIL.auth.Implementations.Controllers;

import M1GIL.auth.Implementations.Dto.LoginDto;
import M1GIL.auth.Implementations.Dto.SignupDto;
import M1GIL.auth.Implementations.Models.LoginModel;
import M1GIL.auth.Implementations.Models.SignupModel;
import M1GIL.auth.Interfaces.IControllers.IAuthController;
import M1GIL.auth.Interfaces.IServices.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api") @RequiredArgsConstructor
public class AuthContoller implements IAuthController
{
    private final IAuthService authService;


    @Override
    @PostMapping(path = "/auth/login")
    @CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
    public ResponseEntity<LoginDto> login(@RequestBody LoginModel loginModel)
    {
        LoginDto res = authService.Login(loginModel);

        if(res == null)
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok().body(res);
    }

    @Override
    @PostMapping(path = "/auth/signup")
    @CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
    public ResponseEntity<SignupDto> signup(@RequestBody SignupModel signupModel)
    {
        SignupDto res = authService.Signup(signupModel);

        if(res == null)
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok().body(res);
    }
}