package BackEnd.Form.UsersForms.UserInformationForms;

import BackEnd.Entity.AccountEntity.UserInformation;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInformationDTOForOrder {

    private Integer id;

    private String fullname;

    private String phoneNumber;

}
