package com.ssafy.api.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * 파일업로드 API ([POST] /api/s3) 요청에 대한 응답값 정의
 */
@Getter
@Setter
public class FileDto {
    private String url;
    private String email;
    private MultipartFile file;
}