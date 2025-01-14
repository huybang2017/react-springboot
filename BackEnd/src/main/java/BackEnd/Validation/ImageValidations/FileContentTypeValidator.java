package BackEnd.Validation.ImageValidations;

import java.util.Arrays;
import java.util.List;

import BackEnd.Validation.ImageValidations.FileContentType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.springframework.web.multipart.MultipartFile;

public class FileContentTypeValidator implements ConstraintValidator<FileContentType, MultipartFile> {

    private List<String> allowedContentTypes;

    @Override
    public void initialize(FileContentType constraint) {
        this.allowedContentTypes = Arrays.asList(constraint.allowed());
    }

    @Override
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext context) {
        return multipartFile == null
            || this.allowedContentTypes.contains(multipartFile.getContentType());
    }

}