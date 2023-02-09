package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.FileDto;
import com.ssafy.api.domain.entity.FileEntity;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class S3Controller {
    @Autowired
    private final S3Service s3Service;
    @Autowired
    private final FileService fileService;

    @GetMapping("/api/upload")
    public String goToUpload() {
        return "upload";
    }

    @PostMapping("/api/upload")
    public String uploadFile(FileDto fileDto) throws IOException {
        String url = s3Service.uploadFile(fileDto.getFile());

        fileDto.setUrl(url);
        fileService.save(fileDto);

        return "redirect:/api/list";
    }

    @GetMapping("/api/list")
    public String listPage(Model model) {
        List<FileEntity> fileList =fileService.getFiles();
        model.addAttribute("fileList", fileList);
        return "list";
    }
}
