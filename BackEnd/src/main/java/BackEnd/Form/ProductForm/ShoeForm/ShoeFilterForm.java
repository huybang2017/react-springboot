package BackEnd.Form.ProductForm.ShoeForm;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeFilterForm {

    //Admin
    private Boolean status;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date minCreateDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date maxCreateDate;

    private Boolean priority;

    private  Integer brandId;

    private  Integer shoeTypeId;

    private List< Integer> listShoeColorId;


    //User

    @Min(value = 0, message = "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "Giá tối đa không được vượt quá 1,000,000,000")
    private Integer minPrice;

    @Min(value = 0, message = "Giá tối đa phải lớn hơn hoặc bằng 0")
    @Max(value = 1000000000, message = "Giá tối đa không được vượt quá 1,000,000,000")
    private Integer maxPrice;

    private Integer size;

    // Event
    private Integer eventId;


    // Special Sort
    private String specialSort;

}
