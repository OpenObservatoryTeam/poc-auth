package M1GIL.auth.Interfaces.IRepositories;

import M1GIL.auth.Implementations.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepo extends JpaRepository<Role,Long>
{
    Role findByName(String name);
}
