package BackEnd.Form.UsersForms.AccountForms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class AccountResetPasswordForm {

    private String email;

    private String newPassword;

    private String token;

}
