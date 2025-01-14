package BackEnd.Validation.ImageValidations;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;

public class MultipartFileListValidator implements ConstraintValidator<ValidMultipartFileList, List<MultipartFile>> {

    @Override
    public boolean isValid(List<MultipartFile> files, ConstraintValidatorContext context) {
        if (files == null || files.isEmpty()) {
            return true; // Consider empty lists as valid, or you can change this logic
        }

        for (MultipartFile file : files) {
            // Check for file size
            if (file.getSize() > 1024 * 1024 *10) { // 10MB
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("File bắt buộc phải nhỏ hơn hoặc bằng 10MB")
                    .addConstraintViolation();
                return false;
            }

            // Check for content type
            String contentType = file.getContentType();
            if (!MediaType.IMAGE_JPEG_VALUE.equals(contentType) && !MediaType.IMAGE_PNG_VALUE.equals(contentType)) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("File bắt buộc phải có dạng jpg, png, jpeg")
                    .addConstraintViolation();
                return false;
            }
        }
        return true;
    }
}

