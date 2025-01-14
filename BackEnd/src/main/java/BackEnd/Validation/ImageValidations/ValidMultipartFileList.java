package BackEnd.Validation.ImageValidations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = MultipartFileListValidator.class)
@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidMultipartFileList {
    String message() default "Bạn chỉ có thể gửi ảnh dạng png, jpeg, jpg và không được quá 10MB !";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

