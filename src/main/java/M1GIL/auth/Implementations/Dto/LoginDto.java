package M1GIL.auth.Implementations.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class LoginDto
{
    private Long id;
    private Date creationDate;
    private String username;
    private String authToken;
    private String refreshToken;
}
