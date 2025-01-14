package BackEnd.Form.NewsForms.FeedbackImageForms;


import BackEnd.Validation.ImageValidations.FileContentType;
import BackEnd.Validation.ImageValidations.FileSize;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackImageCreateForm {

    @NotNull
    private Integer feedbackId;

    @FileSize(max = "10MB")
    @FileContentType(allowed = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    private MultipartFile imageFile;
}
