package M1GIL.auth.Interfaces.IControllers;

import M1GIL.auth.Implementations.Dto.LoginDto;
import M1GIL.auth.Implementations.Dto.SignupDto;
import M1GIL.auth.Implementations.Models.LoginModel;
import M1GIL.auth.Implementations.Models.SignupModel;
import org.springframework.http.ResponseEntity;

public interface IAuthController
{
    ResponseEntity<LoginDto>login(LoginModel loginModel);
    ResponseEntity<SignupDto>signup(SignupModel signupModel);
}
