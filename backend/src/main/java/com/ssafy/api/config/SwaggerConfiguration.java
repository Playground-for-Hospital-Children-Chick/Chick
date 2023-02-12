package com.ssafy.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration // 스프링 실행시 설정파일
@EnableSwagger2 // Swagger2를 사용
@SuppressWarnings("unchecked") // warning 제거
public class SwaggerConfiguration {

//	Swagger-UI 2.x 확인
//	http://localhost[:8080]/{your-app-root}/swagger-ui.html
//	Swagger-UI 3.x 확인
//	http://localhost[:8080]/{your-app-root}/swagger-ui/index.html

    private String version = "V1";
    private String title = "병아리 Backend API " + version;

    private ApiInfo apiInfo() {
        String descript = "병아리 React API Reference for Developers<br>";
        descript += "<img src=\"/assets/img/chick.jpg\">";
        return new ApiInfoBuilder().title(title).description(descript)
//				.termsOfServiceUrl("https://edu.ssafy.com")
                .contact(new Contact("병아리", "http://i8b207.p.ssafy.io/", "kimchick207@gmail.com")).license("chick License")
                .licenseUrl("http://i8b207.p.ssafy.io/").version("1.0").build();
    }

    public Docket getDocket(String groupName, Predicate<String> predicate) {
//		List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
//		responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
//		responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
//		responseMessages.add(new ResponseMessageBuilder().code(404).message("페이지를 찾을 수 없습니다 !!!").build());
        return new Docket(DocumentationType.SWAGGER_2).groupName(groupName).apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.api.controller")).paths(predicate)
                .apis(RequestHandlerSelectors.any()).build();
//				.useDefaultResponseMessages(false)
//				.globalResponseMessage(RequestMethod.GET,responseMessages);
    }

    public Docket getDefaultDocket(String groupName, Predicate<String> predicate) {
        return new Docket(DocumentationType.SWAGGER_2).groupName(groupName).apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.api.controller")).paths(predicate)
                .apis(RequestHandlerSelectors.any()).build();
//				.useDefaultResponseMessages(false)
//				.globalResponseMessage(RequestMethod.GET,responseMessages);
    }

    // swagger ui 설정.
    @Bean
    public Docket allApi() {
        return getDocket("전체", Predicates.or(PathSelectors.regex("/*.*")));
    }
    @Bean
    public UiConfiguration uiConfig() {
        return UiConfigurationBuilder.builder().displayRequestDuration(true).validatorUrl("").build();
    }

    // API마다 구분짓기 위한 설정.
//    @Bean
//    public Docket userApi() {
//        return getDocket("회원관리", Predicates.or(PathSelectors.regex("/api/users.*")));
//    }
//    @Bean
//    public Docket loginApi() {
//        return getDocket("로그인 및 토큰 재발급", Predicates.or(PathSelectors.regex("/api/auth.*")));
//    }
//    @Bean
//    public Docket reportApi() {
//        return getDocket("차단관리", Predicates.or(PathSelectors.regex("/api/report.*")));
//    }
//    @Bean
//    public Docket S3Api() {
//        return getDocket("S3관리 및 유튜브", Predicates.or(PathSelectors.regex("/api/s3.*")));
//    }


}
