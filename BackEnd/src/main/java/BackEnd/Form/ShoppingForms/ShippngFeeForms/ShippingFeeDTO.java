package BackEnd.Form.ShoppingForms.ShippngFeeForms;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShippingFeeDTO {

    private Integer fee;

}

