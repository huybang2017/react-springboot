package BackEnd.Form.ProductForm.ShoeImageForm;

import BackEnd.Validation.ImageValidations.FileContentType;
import BackEnd.Validation.ImageValidations.FileSize;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeImageCreateForm {

    @FileSize(max = "10MB")
    @FileContentType(allowed = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    @NotNull(message = "Bạn không được bỏ trống ảnh !!")
    private MultipartFile shoeImage;

    @NotNull(message = "Bạn không được để trống độ ưu tiên")
    private Boolean priority;

}
