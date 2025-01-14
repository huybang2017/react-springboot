package BackEnd.Form.ProductForm.ShoeTypeForm;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ShoeTypeUpdateForm {

    @NotNull(message = "Bạn không được để trống ID loại sản phẩm muốn update !!")
    private  Integer shoeTypeId;

    @NotBlank(message = "Bạn không được để trống tên loại sản phẩm !!")
    @Size(message = "Tên loại sản phẩm không được dài quá 50 ký tự", max = 50)
    private String shoeTypeName;

}
