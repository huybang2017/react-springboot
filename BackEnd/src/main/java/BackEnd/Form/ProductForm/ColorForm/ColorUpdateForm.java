package BackEnd.Form.ProductForm.ColorForm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColorUpdateForm {

    @NotNull(message = "Bạn không thể để trống ID màu cần update !!")
    private Integer id;

    @NotBlank(message = "Bạn không được để trống tên màu !!")
    @Size(message = "Tên màu sắc không được dài quá 50 ký tự", max = 50)
    private String colorName;

}
