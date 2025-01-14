package BackEnd.Form.ShoppingForms.EventForms;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventFilterForm {

    private Boolean status;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date eventTime;

    @Min(value = 0, message = "% tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "% tối đa không được vượt quá 100%")
    private Byte minPercent;

    @Min(value = 0, message = "% tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "% tối đa không được vượt quá 100%")
    private Byte maxPercent;
}
