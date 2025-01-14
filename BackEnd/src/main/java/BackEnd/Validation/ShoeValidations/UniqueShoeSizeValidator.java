package BackEnd.Validation.ShoeValidations;

import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UniqueShoeSizeValidator implements ConstraintValidator<UniqueShoeSize, List<ShoeSizeCreateForm>> {

    @Override
    public boolean isValid(List<ShoeSizeCreateForm> shoeSizes, ConstraintValidatorContext context) {
        if (shoeSizes == null || shoeSizes.isEmpty()) {
            return true; // Valid as it's not the validator's responsibility to check null or empty
        }

        Set<Byte> sizes = new HashSet<>();
        for (ShoeSizeCreateForm shoeSize : shoeSizes) {
            if (!sizes.add(shoeSize.getSize())) {
                return false; // Found a duplicate size
            }
        }
        return true; // All sizes are unique
    }
}
