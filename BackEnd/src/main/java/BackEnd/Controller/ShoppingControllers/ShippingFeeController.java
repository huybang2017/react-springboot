package BackEnd.Controller.ShoppingControllers;

import BackEnd.Form.ShoppingForms.ShippngFeeForms.ShippingFeeCreateForm;
import BackEnd.Form.ShoppingForms.ShippngFeeForms.ShippingFeeDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ShippingFee")
public class ShippingFeeController {

    private Integer shippingFee = 40000;

    @PostMapping
    public ShippingFeeDTO createShippingFee(@ModelAttribute ShippingFeeCreateForm form) {
        shippingFee = form.getFee();
        return getNewestShippingFee();
    }

    @GetMapping("/Newest")
    public ShippingFeeDTO getNewestShippingFee() {
        return new ShippingFeeDTO(shippingFee);
    }
}

