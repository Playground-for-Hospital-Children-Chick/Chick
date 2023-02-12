package com.ssafy.api.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FileDto {
    private String url;
    private String email;
    private MultipartFile file;
}