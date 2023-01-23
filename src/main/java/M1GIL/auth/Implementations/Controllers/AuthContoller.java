package M1GIL.auth.Implementations.Controllers;

import M1GIL.auth.Implementations.Dto.LoginDto;
import M1GIL.auth.Implementations.Dto.SignupDto;
import M1GIL.auth.Implementations.Models.LoginModel;
import M1GIL.auth.Implementations.Models.SignupModel;
import M1GIL.auth.Interfaces.IControllers.IAuthController;
import M1GIL.auth.Interfaces.IServices.IAuthService;
import lombok.RequiredArgsConstructor;

import javax.print.DocFlavor.STRING;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthContoller implements IAuthController {
    private final IAuthService authService;
    private static final String TOKEN_NAME = "token";
    private static final String REFRESH_TOKEN_NAME = "refreshToken";

    @Override
    @PostMapping(path = "/auth")
    public ResponseEntity<LoginDto> auth(HttpServletResponse response,
            @CookieValue(value = REFRESH_TOKEN_NAME) String refreshToken, HttpServletRequest request) {

        LoginDto res = authService.auth(refreshToken);

        if (res == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED.value()).build();
        }

        var cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            cookie.setValue(null);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }

        Cookie cookieToken = new Cookie(TOKEN_NAME, res.getAuthToken());
        Cookie cookieRefresh = new Cookie(REFRESH_TOKEN_NAME, res.getRefreshToken());
        cookieToken.setMaxAge(60);
        cookieRefresh.setMaxAge(7 * 24 * 3600);
        cookieToken.setPath("/");
        cookieRefresh.setPath("/");
        response.addCookie(cookieToken);
        response.addCookie(cookieRefresh);

        return ResponseEntity.ok(res);
    }

    @Override
    @PostMapping(path = "/auth/login")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<LoginDto> login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
        LoginDto res = authService.Login(loginModel);

        if (res == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED.value()).build();

        Cookie cookieToken = new Cookie(TOKEN_NAME, res.getAuthToken());
        Cookie cookieRefresh = new Cookie(REFRESH_TOKEN_NAME, res.getRefreshToken());
        cookieToken.setMaxAge(60);
        cookieRefresh.setMaxAge(7 * 24 * 3600);
        cookieToken.setPath("/");
        cookieRefresh.setPath("/");
        response.addCookie(cookieToken);
        response.addCookie(cookieRefresh);
        return ResponseEntity.ok().body(res);
    }

    @Override
    @PostMapping(path = "/auth/signup")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<SignupDto> signup(@RequestBody SignupModel signupModel) {
        SignupDto res = authService.Signup(signupModel);

        if (res == null)
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok().body(res);
    }

    @Override
    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie token = new Cookie(TOKEN_NAME, null);
        Cookie refresh = new Cookie(REFRESH_TOKEN_NAME, null);
        token.setPath("/");
        refresh.setPath("/");
        token.setMaxAge(0);
        refresh.setMaxAge(0);
        response.addCookie(refresh);
        response.addCookie(token);
        return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).build();
    }
}