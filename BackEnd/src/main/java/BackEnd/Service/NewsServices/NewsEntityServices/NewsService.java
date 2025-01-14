package BackEnd.Service.NewsServices.NewsEntityServices;

import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Entity.NewsEntities.News;
import BackEnd.Form.NewsForms.NewsEntityForms.NewsCreateForm;
import BackEnd.Form.NewsForms.NewsEntityForms.NewsFilterForm;
import BackEnd.Form.NewsForms.NewsEntityForms.NewsUpdateForm;
import BackEnd.Form.NewsForms.NewsImageEntityForms.NewsImageDeleteForm;
import BackEnd.Other.ImageService.ImageService;
import BackEnd.Repository.NewsRepositories.INewsRepository;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.NewsServices.NewsImageServices.INewsImageService;
import BackEnd.Specification.NewsSpecifications.NewsSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class NewsService implements INewsService {

    @Autowired
    private INewsRepository newsRepository;

    @Autowired
    private INewsImageService newsImageService;

    @Autowired
    @Lazy
    private IAccountService accountService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public News getNewsById(Integer newsId) {
        return newsRepository.findById(newsId).orElse(null);
    }

    @Override
    public List<News> getAllPrioritialNews() {
        return newsRepository.findByPriorityFlag(true);
    }

    @Override
    public Page<News> getAllNewsByUser(Pageable pageable) {
        NewsFilterForm form = new NewsFilterForm();
        form.setStatus(true);
        Specification<News> where = NewsSpecification.buildWhere("", form);
        return newsRepository.findAll(where, pageable);
    }

    @Override
    public Page<News> getAllNewsByAdmin(Pageable pageable, NewsFilterForm form, String search) {
        Specification<News> where = NewsSpecification.buildWhere(search, form);
        return newsRepository.findAll(where, pageable);
    }

    @Override
    @Transactional
    public News createNews(NewsCreateForm form) throws IOException {

        // Manually mapping fields from form to entity
        News news = new News();
        news.setTitle(form.getTitle());

        String bannerPath = ImageService.saveImage(ImageService.newsImagePath, form.getBanner());
        news.setBanner(bannerPath);


        news.setContent(form.getContent());
        news.setStatus(form.getStatus() != null ? form.getStatus() : false);
        news.setAuthorId(form.getAuthorId());

        Account account = accountService.getAccountById(form.getAuthorId());
        news.setAccount(account);
        news = newsRepository.save(news);



        // Initialize StringBuilder for efficient string concatenation
        StringBuilder finalContentBuilder = new StringBuilder();
//        System.err.println("______________________Start__________________");
//        System.err.println(form.getContent());
//        System.err.println("______________________End__________________");

        // Split the content by <img src=" to handle image paths
        String[] split = news.getContent().split("<img src=\"");
        int i = 0;
//        for(String j: split){
//            System.err.println(j);
//            System.err.println("________________");
//
//        }

        // Iterate through the images and build the final content
        for (MultipartFile file : form.getNewsImageList()) {
            // Generate the image path and URL
            String temp = newsImageService.createNewsImage(news, file).getPath();
//            System.err.println("Link ảnh: " + temp);

            // Handle cases where the split array might be out of bounds
            if (i < split.length - 1) {

                // Append the remaining content after the current image URL
                String tempString = split[i];

                if (i > 0) {
                    // Kết quả sau khi thay đổi
                    tempString = cutStringAfterChar(tempString, '\"');
                    finalContentBuilder.append("'").append(tempString);
                }else{
                    finalContentBuilder.append(tempString);
                }

                i++;


                // Append the part before the current image URL and the image URL
                finalContentBuilder.append("<img src='").append("http://localhost:8080/NewsImage/").append(temp);


            }
        }

        String tempString = split[split.length - 1];
        // If there are more images than expected, handle accordingly
        // Append any remaining content from the split array
//        System.err.println("Đã thêm lần cuối:'" + cutStringAfterChar(tempString, '\"') );
        finalContentBuilder.append("'").append(cutStringAfterChar(tempString, '\"'));

        // Convert StringBuilder to final string content
        String finalContent = finalContentBuilder.toString();
        news.setContent(finalContent);
//        System.err.println("______________________Start__________________");
//        System.err.println(news.getContent());
//        System.err.println("______________________End__________________");


        return newsRepository.save(news);
    }

    public String cutStringAfterChar(String input, char delimiter) {
        int index = input.indexOf(delimiter);
        if (index != -1) {
            return input.substring(index + 1); // Trả về phần còn lại sau ký tự delimiter
        }
        return ""; // Trả về chuỗi rỗng nếu không tìm thấy ký tự
    }

    @Override
    @Transactional
    public News updateNews(NewsUpdateForm form) throws IOException {
        News news = getNewsById(form.getId());
        if (news != null) {
            if (form.getTitle() != null) {
                news.setTitle(form.getTitle());
            }
            if (form.getContent() != null) {
                news.setContent(form.getContent());
            }
            if (form.getBanner() != null) {
//                ImageService.deleteImage(ImageService.newsImagePath, news.getBanner());
                String newBanner = ImageService.saveImage(ImageService.newsImagePath, form.getBanner());
                news.setBanner(newBanner);
            }
            if (form.getStatus() != null) {
                news.setStatus(form.getStatus());
            }
            if (form.getPriorityFlag() != null) {
                news.setPriorityFlag(form.getPriorityFlag());
            }
            return newsRepository.save(news);
        }
        return null;
    }
}
