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
public class VoucherUpdateForm {

    @NotNull(message = "ID của voucher không được để trống")
    private Integer voucherId;

    private String title;

    private Boolean status;

    @FutureOrPresent(message = "Thời gian hết hạn phải là thời gian hiện tại hoặc tương lai")
    @DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime expirationTime;

    @PositiveOrZero(message = "Số tiền giảm phải lớn hơn hoặc bằng 0")
    private Integer discountAmount;

    @Min(value = 0, message = "Điều kiện phải lớn hơn hoặc bằng 0")
    private Integer condition;

    private Boolean isFreeShip;
}
