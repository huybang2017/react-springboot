package BackEnd.Controller.AccountController;

import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Form.UsersForms.AccountForms.AccountDTOForProfile;
import BackEnd.Form.UsersForms.AccountForms.AccountUpdateForm;
import BackEnd.Form.UsersForms.UserInformationForms.UserInformationCreateForm;
import BackEnd.Form.UsersForms.UserInformationForms.UserInformationCreateFormForOrderAdmin;
import BackEnd.Form.UsersForms.UserInformationForms.UserInformationDTOForOrder;
import BackEnd.Form.UsersForms.UserInformationForms.UserInformationUpdateForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.UserInformationService.IUserInformationService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/UserInformation")
public class UserInformationController {

    @Autowired
    private IUserInformationService informationService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAccountService accountService;

    @GetMapping()
    public ResponseEntity<Page<UserInformationDTOForOrder>> getAllUser(Pageable pageable, @RequestParam(required = false) String search) {
        Page <UserInformation> entities = informationService.getAll(pageable, search);
        List<UserInformationDTOForOrder> dto = modelMapper.map(entities.getContent(), new TypeToken<List<UserInformationDTOForOrder>>(){}.getType());
        Page<UserInformationDTOForOrder> dtoPage = new PageImpl<>( dto, pageable, entities.getTotalElements());
        return ResponseEntity.ok(dtoPage);
    }

    @PostMapping()
    public ResponseEntity<UserInformationDTOForOrder> createNewUser(@Valid @ModelAttribute UserInformationCreateFormForOrderAdmin userCreateForm) {
        UserInformationCreateForm form = modelMapper.map(userCreateForm, UserInformationCreateForm.class);
        UserInformation userInformation = informationService.createUser(form);
        UserInformationDTOForOrder dto = modelMapper.map(userInformation, UserInformationDTOForOrder.class);
        return ResponseEntity.ok(dto);
    }

    @PatchMapping()
    public UserInformationDTOForOrder updateAccount(@ModelAttribute @Valid UserInformationUpdateForm form){
        return modelMapper.map(informationService.updateUser(form), UserInformationDTOForOrder.class);
    }


}
