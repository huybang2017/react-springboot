package BackEnd.Form.ShoppingForms.OrderForm;


import BackEnd.Form.ShoppingForms.OrderDetailForm.OrderDetailDTO;
import BackEnd.Form.ShoppingForms.OrderStatusForms.OrderStatusDTO;
import BackEnd.Form.ShoppingForms.VoucherForms.VoucherDTO;
import BackEnd.Form.UsersForms.UserInformationForms.UserInformationDTOForOrder;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTODetailUser {

    private String id;

    private Integer totalPrice;

    private Integer shippingFee;

    private String type;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime orderDate;

    private Integer subtotalPrice;

    private String note;

    private VoucherDTO voucher;

    private List<OrderStatusDTO> orderStatuses;

    private List<OrderDetailDTO> orderDetails;

}
