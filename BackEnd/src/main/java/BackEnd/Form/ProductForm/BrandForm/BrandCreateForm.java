package BackEnd.Form.ProductForm.BrandForm;


import BackEnd.Validation.ImageValidations.FileContentType;
import BackEnd.Validation.ImageValidations.FileSize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BrandCreateForm {

    @NotBlank(message = "Bạn không được để trống tên thương hiệu !!")
    @Size(message = "Tên thương hiệu không được dài quá 50 ký tự", max = 50)
    private String brandName;

    @FileSize(max = "10MB")
    @FileContentType(allowed = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    private MultipartFile logo;

}
