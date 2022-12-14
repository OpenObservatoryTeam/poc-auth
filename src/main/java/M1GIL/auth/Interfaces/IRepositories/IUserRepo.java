package M1GIL.auth.Interfaces.IRepositories;

import M1GIL.auth.Implementations.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepo extends JpaRepository<User,Long>
{
    User findByusername(String username);
}
