package BackEnd.Form.UsersForms.UserInformationForms;

import BackEnd.Entity.AccountEntity.UserInformation;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInformationCreateFormForOrderAdmin {

    @Size(max = 255, message = "Fullname cannot exceed 255 characters")
    private String fullname;

    private String phoneNumber;

}
