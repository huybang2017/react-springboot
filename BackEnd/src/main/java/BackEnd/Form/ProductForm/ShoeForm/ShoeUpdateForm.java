package BackEnd.Form.ProductForm.ShoeForm;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeUpdateForm {

    private Integer shoeId;

    @Size(message = "Tên sản phẩm không được dài quá 255 ký tự", max = 255)
    private String shoeName;

    private Boolean status;

    private String description;

    private Boolean priority;

    private Integer shoeColorId;

    private Integer brandId;

    private Integer shoeTypeId;
}

