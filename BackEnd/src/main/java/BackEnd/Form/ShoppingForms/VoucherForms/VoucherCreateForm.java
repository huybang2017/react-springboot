package BackEnd.Form.ShoppingForms.VoucherForms;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherCreateForm {

    @NotNull(message = "Trạng thái không được để trống")
    private Boolean status;

    private String code;

    @NotBlank(message = "Tiêu đề không được để trống")
    private String title;

    @NotNull(message = "Thời gian hết hạn không được để trống")
    @FutureOrPresent(message = "Thời gian hết hạn phải là thời gian hiện tại hoặc tương lai")
    @DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime expirationTime;

    @NotNull(message = "Số tiền giảm giá không được để trống")
    @PositiveOrZero(message = "Số tiền giảm phải lớn hơn hoặc bằng 0")
    private Integer discountAmount;

    @NotNull(message = "Điều kiện không được để trống")
    @Min(value = 0, message = "Điều kiện phải lớn hơn hoặc bằng 0")
    private Integer condition;

    @NotNull(message = "isFreeShip không được để trống")
    private Boolean isFreeShip;
}
