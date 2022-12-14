package M1GIL.auth;

import M1GIL.auth.Implementations.Entities.Role;
import M1GIL.auth.Implementations.Entities.User;
import M1GIL.auth.Interfaces.IServices.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication
public class AuthApiApplication
{
	public static void main(String[] args) {
		SpringApplication.run(AuthApiApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(IUserService userService)
	{
		return args ->
		{
			userService.saveRole(new Role(null,"ADMIN"));
			userService.saveRole(new Role(null,"USER"));

			userService.saveUser(new User(null,new Date(System.currentTimeMillis()) ,"john","lastName1","user1","12345",new ArrayList<>()));
			userService.saveUser(new User(null,new Date(System.currentTimeMillis()),"emily","lastName2","user2","12345",new ArrayList<>()));

			userService.addRoleToUser("user1","ADMIN");
			userService.addRoleToUser("user1","USER");
			userService.addRoleToUser("user2","USER");
		};
	}
}
