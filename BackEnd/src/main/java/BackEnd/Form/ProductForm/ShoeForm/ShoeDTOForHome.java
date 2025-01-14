package BackEnd.Form.ProductForm.ShoeForm;


import BackEnd.Form.ProductForm.BrandForm.BrandDTOForShoe;
import BackEnd.Form.ProductForm.ShoeColorForms.ShoeColorDTOForGetShoeDetail;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeDTOForShoe;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ShoeDTOForHome {

    private  Integer shoeId;

    private String shoeName;

    private String description;

    private Integer price;

    private String image;

    private Byte sale;

}
