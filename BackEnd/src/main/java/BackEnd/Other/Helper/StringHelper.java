package BackEnd.Other.Helper;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringHelper {
    public static String removeAccents(String input) {
        // Kiểm tra xem chuỗi đầu vào có null hay không
        if (input == null) {
            return null;
        }

        // Sử dụng Normalizer để chuẩn hóa chuỗi
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);

        // Sử dụng regex để loại bỏ các ký tự dấu
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("").replaceAll("[^\\p{ASCII}]", "");
    }
}
