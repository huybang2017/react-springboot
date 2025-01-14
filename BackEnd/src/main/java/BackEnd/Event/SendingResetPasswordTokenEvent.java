package BackEnd.Event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class SendingResetPasswordTokenEvent extends ApplicationEvent {

    private String email;

    public SendingResetPasswordTokenEvent(String email) {
        super(email);
        this.email = email;
    }

}
