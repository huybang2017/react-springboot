package BackEnd.Validation.ShoeValidations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueShoeSizeValidator.class)
public @interface UniqueShoeSize {
    String message() default "Size giày phải là duy nhất !!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

