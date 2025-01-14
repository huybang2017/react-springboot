package BackEnd.Form.NewsForms.NewsEntityForms;

import BackEnd.Validation.ImageValidations.FileContentType;
import BackEnd.Validation.ImageValidations.FileSize;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsUpdateForm {

    @NotNull(message = "Bạn không thể để trống ID của `News` cần update !!")
    private Integer id;

    @FileSize(max = "10MB")
    @FileContentType(allowed = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    private MultipartFile banner;

    private String content;

    private String title;

    private Boolean status;

    private Boolean priorityFlag;
}
