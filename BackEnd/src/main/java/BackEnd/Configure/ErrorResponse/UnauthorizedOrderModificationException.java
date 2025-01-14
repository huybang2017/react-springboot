package BackEnd.Configure.ErrorResponse;

//TODO: Dành cho những đơn hàng bị thay đổi bằng Script
public class UnauthorizedOrderModificationException extends Exception{
    public UnauthorizedOrderModificationException(String error){
        super(error);
    }
}
