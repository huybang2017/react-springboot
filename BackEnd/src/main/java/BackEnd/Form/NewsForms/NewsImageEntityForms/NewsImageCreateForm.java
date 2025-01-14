package BackEnd.Form.NewsForms.NewsImageEntityForms;

import BackEnd.Validation.ImageValidations.FileContentType;
import BackEnd.Validation.ImageValidations.FileSize;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsImageCreateForm {

    @NotNull(message = "NewsId is required")
    private Integer newsId;

    @NotNull(message = "Bạn không được để trống ảnh !!")
    @FileSize(max = "10MB")
    @FileContentType(allowed = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    private MultipartFile imageFile;

}

