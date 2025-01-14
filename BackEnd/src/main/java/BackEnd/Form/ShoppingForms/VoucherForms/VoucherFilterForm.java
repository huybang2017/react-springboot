package BackEnd.Form.ShoppingForms.VoucherForms;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherFilterForm {

    private Boolean status;


    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date from;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date to;

    @Min(value = 0, message = "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "Giá tối đa không được vượt quá 1,000,000,000")
    private Integer minCondition;

    @Min(value = 0, message = "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "Giá tối đa không được vượt quá 1,000,000,000")
    private Integer maxCondition;

    private Boolean isFreeShip;

    @Min(value = 0, message = "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "Giá tối đa không được vượt quá 1,000,000,000")
    private Integer minDiscountAmount;

    @Min(value = 0, message = "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "Giá tối đa không được vượt quá 1,000,000,000")
    private Integer maxDiscountAmount;

}

