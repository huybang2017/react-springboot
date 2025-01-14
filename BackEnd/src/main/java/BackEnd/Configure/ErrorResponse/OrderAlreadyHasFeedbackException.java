package BackEnd.Configure.ErrorResponse;

public class OrderAlreadyHasFeedbackException extends Exception{
    public OrderAlreadyHasFeedbackException(String errorMessage){
        super(errorMessage);
    }
}
