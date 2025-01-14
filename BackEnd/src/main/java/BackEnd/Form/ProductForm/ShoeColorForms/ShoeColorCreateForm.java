package BackEnd.Form.ProductForm.ShoeColorForms;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeColorCreateForm {

    @NotNull(message = "Bạn không được thiếu Color Id !")
    @Positive(message = "Color ID phải là 1 số nguyên dương !")
    private  Integer colorId;

    @NotNull(message = "Bạn không được thiếu Shoe Id !")
    @Positive(message = "Shoe ID phải là 1 số nguyên dương !")
    private  Integer shoeId;
}
