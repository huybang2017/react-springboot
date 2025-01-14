package BackEnd.Form.ProductForm.ShoeForm;

import BackEnd.Form.ProductForm.ShoeColorForms.ShoeColorCreateFormForCreateShoe;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Validation.ShoeValidations.UniqueShoeSize;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeCreateForm {

    @NotBlank(message = "Bạn không được bỏ trống tên sản phẩm !")
    @Size(message = "Tên sản phẩm không được dài quá 255 ký tự !", max = 255)
    private String shoeName;

    @NotNull(message = "Bạn không được bỏ trống trạng thái sản phẩm")
    private Boolean status;

    private String description;

    private Boolean priority;

    @NotNull(message = "Bạn không được thiếu BrandId !!")
    private  Integer brandId;

    @NotNull(message = "Bạn không được thiếu ShoeTypeId !!")
    private  Integer shoeTypeId;

    @Valid
    private List<@Valid ShoeColorCreateFormForCreateShoe> shoeColors;

    @Valid
    @UniqueShoeSize(message = "Danh sách size giày không được trùng lặp !!")
    @NotEmpty(message = "Bạn không được để trống danh sách size giày khi tạo giày mới !!")
    private List<@Valid ShoeSizeCreateForm> shoeSizes;

    @Valid
    @NotEmpty(message = "Bạn không được để trống danh sách ảnh khi tạo giày mới !!")
    private List<@Valid ShoeImageCreateForm> shoeImages;
}
