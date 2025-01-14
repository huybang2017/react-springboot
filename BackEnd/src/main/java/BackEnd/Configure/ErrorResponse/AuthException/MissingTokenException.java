package BackEnd.Configure.ErrorResponse.AuthException;

import org.springframework.security.core.AuthenticationException;

//TODO: Exeption dùng trong trường hợp User không gửi token
public class MissingTokenException  extends AuthenticationException {

    public MissingTokenException(String msg) {
        super(msg);
    }

}
