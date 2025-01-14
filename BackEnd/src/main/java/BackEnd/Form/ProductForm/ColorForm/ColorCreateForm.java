package BackEnd.Form.ProductForm.ColorForm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ColorCreateForm {

    @NotBlank(message = "Bạn không được để trống tên màu !!")
    @Size(message = "Tên màu sắc không được dài quá 50 ký tự", max = 50)
    private String colorName;
}
