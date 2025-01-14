package BackEnd.Configure;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ComponentConfiguration implements WebMvcConfigurer {
    @Bean
    public ModelMapper initModelMapper(){
        return new ModelMapper();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")  // Bạn có thể chỉ định các tên miền cụ thể thay vì "*"
            .allowedMethods("GET", "POST", "PATCH", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(false);
    }
}

