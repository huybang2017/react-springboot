package BackEnd.Configure.WebSecurity;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import BackEnd.Configure.ErrorResponse.AuthException.AccountBannedException;
import BackEnd.Configure.ErrorResponse.AuthException.AuthExceptionHandler;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.AuthService.JWTUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static BackEnd.Entity.AccountEntity.Account.AccountType.FACEBOOK;
import static BackEnd.Entity.AccountEntity.Account.AccountType.GOOGLE;

@Component
public class OAuthAuthenicationSuccessHandler implements AuthenticationSuccessHandler {

//    Logger logger = LoggerFactory.getLogger(OAuthAuthenicationSuccessHandler.class);

    @Autowired
    @Lazy
    private IAccountService accountService;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    @Lazy
    private AuthExceptionHandler authExceptionHandler;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> attributes = oauth2AuthenticationToken.getPrincipal().getAttributes();

        // Identify the provider
        String authorizedClientRegistrationId = oauth2AuthenticationToken.getAuthorizedClientRegistrationId();

        Account account = null;

        if (authorizedClientRegistrationId.equalsIgnoreCase("google")) {
            account = accountService.registerOrAuthenticateUser((String) attributes.get("email"), GOOGLE);
        }

        if (authorizedClientRegistrationId.equalsIgnoreCase("facebook")) {
            account = accountService.registerOrAuthenticateUser((String) attributes.get("email"), FACEBOOK);
        }

        if (!account.getStatus()){
            authExceptionHandler.commence(request, response, new AccountBannedException("Tài khoản này đã bị khóa !"));
        }

        // Lấy thông tin cần thiết
        String id = String.valueOf(account.getId()); // Giả sử getId() trả về ID của tài khoản
        String email = (String) attributes.get("email");
        String token = jwtUtils.generateToken(account);
        String refreshToken =  jwtUtils.generateRefreshToken(new HashMap<>(), account);

        // Tạo URL với các tham số truy vấn
        String redirectUrl = String.format("http://localhost:5173/pageSignInGoogle?id=%s&email=%s&token=%s&refreshToken=%s",
            id, email, token, refreshToken);

        // Redirect đến URL đã tạo
        new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }


}