package M1GIL.auth.Interfaces.IServices;

import M1GIL.auth.Implementations.Dto.LoginDto;
import M1GIL.auth.Implementations.Dto.SignupDto;
import M1GIL.auth.Implementations.Models.LoginModel;
import M1GIL.auth.Implementations.Models.SignupModel;

public interface IAuthService {
    LoginDto auth(String refreshToken);

    LoginDto Login(LoginModel loginModel);

    SignupDto Signup(SignupModel signupModel);
}
