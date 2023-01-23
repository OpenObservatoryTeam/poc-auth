package M1GIL.auth.Interfaces.IControllers;

import M1GIL.auth.Implementations.Dto.LoginDto;
import M1GIL.auth.Implementations.Dto.SignupDto;
import M1GIL.auth.Implementations.Models.LoginModel;
import M1GIL.auth.Implementations.Models.SignupModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;

public interface IAuthController {

    ResponseEntity<LoginDto> auth(HttpServletResponse response, String refreshToken, HttpServletRequest request);

    ResponseEntity<LoginDto> login(LoginModel loginModel, HttpServletResponse response);

    ResponseEntity<SignupDto> signup(SignupModel signupModel);

    ResponseEntity<?> logout(HttpServletResponse response);
}
