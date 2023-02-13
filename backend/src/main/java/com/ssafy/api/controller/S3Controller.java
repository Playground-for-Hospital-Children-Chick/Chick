package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.BaseResponseBody;
import com.ssafy.api.domain.dto.FileDto;
import com.ssafy.api.domain.dto.S3ImagesRes;
import com.ssafy.api.domain.dto.YoutubeRes;
import com.ssafy.api.domain.entity.FileEntity;
import com.ssafy.api.domain.entity.YoutubeKey;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.S3Service;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value = "S3 image upload download", tags = {"S3"})
@RequestMapping("/api/s3")
public class S3Controller {
    @Autowired
    private final S3Service s3Service;
    @Autowired
    private final FileService fileService;

    // 1. 업로드 파일경로 추가
    // 2. upload한 파일보기
    // 3. delete
    // https://green-joo.tistory.com/2
    @PostMapping("/upload")
    public ResponseEntity<BaseResponseBody> uploadFile(FileDto fileDto) throws IOException {
        String url = s3Service.uploadFile(fileDto.getFile(), fileDto.getEmail());
        if(url != null){
            fileDto.setUrl(url);
            fileService.save(fileDto);
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(404, "Failure"));
    }

    @GetMapping("/list")
    public ResponseEntity<S3ImagesRes> listPage(String email) {
        List<FileEntity> fileList =fileService.getFiles(email);
        if(fileList.size()!=0){
            return ResponseEntity.ok(S3ImagesRes.of(200, "Success", fileList));
        }
        return ResponseEntity.ok(S3ImagesRes.of(404, "Failure", null));
    }
    @DeleteMapping("/delete")
    public ResponseEntity<BaseResponseBody> deleteImage(@RequestParam String filePath){
        if(s3Service.deleteFile(filePath)){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(404, "Failure"));
    }
    @GetMapping("/youtubekey")
    public ResponseEntity<YoutubeRes> getKey() {
        List<YoutubeKey> keyList =s3Service.getYKey();
        if(keyList.size()!=0){
            return ResponseEntity.ok(YoutubeRes.of(200, "Success", keyList));
        }
        return ResponseEntity.ok(YoutubeRes.of(404, "Failure", null));
    }
}
