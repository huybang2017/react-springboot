package BackEnd.Controller.AccountController;


import BackEnd.Configure.ErrorResponse.AuthException.MismatchedTokenAccountException;
import BackEnd.Configure.ErrorResponse.InvalidOldPassword;
import BackEnd.Configure.ErrorResponse.InvalidToken;
import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Configure.ErrorResponse.TokenNotExists;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.UsersForms.AccountForms.AccountCreateForm;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import BackEnd.Form.UsersForms.AccountForms.AccountDTOForProfile;
import BackEnd.Form.UsersForms.AccountForms.AccountResetPasswordForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.AuthService.AuthService;
import BackEnd.Service.AccountServices.AuthService.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/Auth")
@Slf4j

public class  AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private IAccountService accountService;


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping(value = "/GetKeyForResetPassword")
    public String getKeyForResetPassword(@RequestParam String email) {
        return accountService.getKeyForResetPassword(email);
    }

    @PatchMapping(value = "/ResetPassword")
    public AccountDTOForProfile resetPasswordOfAccount(AccountResetPasswordForm form) throws InvalidToken, InvalidOldPassword, TokenNotExists {
        return modelMapper.map(accountService.resetPasswordOfAccount(form), AccountDTOForProfile.class);
    }

//    @GetMapping("/Google")
//    public ResponseEntity<LoginInfoDTO> home(HttpServletRequest request) {
//        Account user = (Account) request.getSession().getAttribute("account");
//
//        LoginInfoDTO response = new LoginInfoDTO();
//        //Set các thuộc tính cho kết quả trả về
//        response.setStatusCode(200);
//
//        //Tạo Token
//        String jwt = jwtUtils.generateToken(user);
//        response.setToken(jwt);
//        response.setTokenExpirationTime("30 phút");
//
//        //Tạo refresh token
//        String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
//        response.setRefreshToken(refreshToken);
//        response.setRefreshTokenExpirationTime("7 ngày");
//
//        response.setMessage("Successfully Signed In");
//
//        response.setStatus(user.getStatus());
//        response.setEmail(user.getUsername());
//        response.setId(user.getId());
//        response.setRole(user.getRole().toString());
//
//        // Trả về thông tin người dùng hoặc thực hiện các thao tác khác
//        return ResponseEntity.ok(response);
//
//    }

    //API Login
    @PostMapping(value = "/SignIn")
    public ResponseEntity<?> signInForUser(@ModelAttribute @Valid LoginInputForm signInRequest){

        LoginInfoDTO dto = authService.signInForUser(signInRequest);

        return ResponseEntity.ok(dto);

    }

    //API Login
    @PostMapping(value = "/LoginAdmin")
    public ResponseEntity<?> signInForAdmin(@ModelAttribute @Valid LoginInputForm signInRequest){

        LoginInfoDTO dto = authService.signInForAdmin(signInRequest);

        return ResponseEntity.ok(dto);

    }

    @PostMapping(value = "/Registration")
    public String registration(@ModelAttribute AccountCreateForm form) throws TheValueAlreadyExists {
        Account account = accountService.createAccount(form);
        log.info("Tài khoản " + account.getUsername()+ " được khởi tạo vào thời gian " + account.getCreateAt());
        return "Tạo tài khoản thành công !! Hãy kiêm email " + form.getEmail() + "!";
    }

    //API Kích hoạt tài khoản
    @GetMapping(value = "/ActiveUser")
    public ResponseEntity<String> activeUserViaEmail(@RequestParam String token) {
        int flag = accountService.activateUser(token);

        String htmlResponse = switch (flag) {
            case 0 -> "<html>" +
                "<head><title>Kích hoạt thành công</title></head>" +
                "<body>" +
                "<h1>Kích hoạt tài khoản</h1>" +
                "<p>Tài khoản của bạn đã được kích hoạt thành công!</p>" +
                "</body>" +
                "</html>";
            case 1 -> "<html>" +
                "<head><title>Token hết hạn</title></head>" +
                "<body>" +
                "<h1>Token hết hạn</h1>" +
                "<p>Token của bạn đã hết hạn. Chúng tôi đã gửi cho bạn token mới!</p>" +
                "</body>" +
                "</html>";
            case 2 -> "<html>" +
                "<head><title>Token không hợp lệ</title></head>" +
                "<body>" +
                "<h1>Token không hợp lệ</h1>" +
                "<p>Token này không còn tồn tại hoặc không hợp lệ.</p>" +
                "</body>" +
                "</html>";
            default -> "<html>" +
                "<head><title>Lỗi</title></head>" +
                "<body>" +
                "<h1>Lỗi</h1>" +
                "<p>Đã xảy ra lỗi không mong muốn.</p>" +
                "</body>" +
                "</html>";
        };


        return new ResponseEntity<>(htmlResponse, HttpStatus.OK);
    }

    @PostMapping(value = "/Refresh")
    public ResponseEntity<LoginInfoDTO> refreshToken(@RequestHeader("Authorization") String token,
                                                        @ModelAttribute LoginInfoDTO form) {
        return ResponseEntity.ok(authService.refreshToken(token, form.getRefreshToken()));
    }

}

