package BackEnd.Other.ImageService;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageService {

    public static final String brandLogoPath = "/var/www/uploads";
    public static final String shoeImagePath = "/var/www/uploads";
    public static final String eventBannerPath = "/var/www/uploads";
    public static final String newsImagePath = "/var/www/uploads";
    public static final String feedbackImagePath = "/var/www/uploads";

    public static String saveImage(String folderPath, MultipartFile image) throws IOException {

        // Kỹ thuật lấy đường dẫn tuyệt đối (Sử dụng được đối với mọi thiết bị :3 )
        String uploadDir = new File(folderPath).getAbsolutePath();

        Path uploadDirPath = Paths.get(uploadDir);

        // Check if the folder exists
        if (Files.exists(uploadDirPath) && Files.isDirectory(uploadDirPath)) {
            String fileName = Math.random() + "." + System.currentTimeMillis()
                    + getFileExtension(image.getOriginalFilename());
            Path uploadPath = Paths.get(uploadDir, fileName);
            Files.write(uploadPath, image.getBytes());
            return fileName;

        } else {
            try {
                // Create if folder isn't exists
                Files.createDirectories(uploadDirPath);
            } catch (IOException e) {
                // Handle the exception, e.g., log the error, provide a fallback, etc.
                System.err.println("Error creating folder: " + e.getMessage());
            }
        }
        return null;
    }

//    public static void deleteImage(String folderPath, String imageName) {
//        String uploadDir = new File(folderPath).getAbsolutePath();
//        Path imagePath = Paths.get(uploadDir, imageName);
//
//        try {
//            // Check if the file exists
//            if (Files.exists(imagePath)) {
//                Files.delete(imagePath);
//                System.out.println("Image deleted successfully: " + imageName);
//            } else {
//                System.out.println("Image not found: " + imageName);
//            }
//        } catch (IOException e) {
//            // Handle the exception, e.g., log the error, provide a fallback, etc.
//            System.err.println("Error deleting the image: " + e.getMessage());
//        }
//    }

    private static String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex == -1) {
            return "";
        }
        return fileName.substring(dotIndex);
    }

}
