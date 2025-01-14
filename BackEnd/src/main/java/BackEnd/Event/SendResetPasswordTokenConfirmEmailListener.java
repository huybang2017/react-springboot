package BackEnd.Event;

import BackEnd.Service.AccountServices.EmailService.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
// Đây là class thực thi khi co 1 sự kiện SendingResetPasswordTokenEvent được
// call
public class SendResetPasswordTokenConfirmEmailListener implements ApplicationListener<SendingResetPasswordTokenEvent> {

    @Autowired
    private IEmailService emailService;

    @Override
    /*
     * - Phương thức được thực thi khi SendingRegistrationTokenEvent được call
     * 
     */
    public void onApplicationEvent(SendingResetPasswordTokenEvent event) {
        emailService.sendResetPasswordUserConfirm(event.getEmail());
    }

}
