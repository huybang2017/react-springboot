package BackEnd.Configure.ErrorResponse;

public class ResourceNotFoundException extends Exception{
    public ResourceNotFoundException(String errorMessage){
        super(errorMessage);
    }

}
