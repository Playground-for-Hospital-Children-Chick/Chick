package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.FileEntity;
import com.ssafy.api.domain.entity.YoutubeKey;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.S3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

    @PostMapping("/upload")
    @ApiOperation(value = "파일 업로드", notes = "S3에 파일을 업로드 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 404, message = "업로드 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> uploadFile(FileDto fileDto) throws IOException {
        //파일업로드
        String url = s3Service.uploadFile(fileDto.getFile(), fileDto.getEmail());
        if(url != null){
            //url 값을 DB에 저장
            fileDto.setUrl(url);
            fileService.save(fileDto);
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        //파일 업로드가 실패했을 경우 요청 실패
        return ResponseEntity.ok(BaseResponseBody.of(404, "Failure"));
    }

    @GetMapping("/list")
    @ApiOperation(value = "파일 리스트 가져오기", notes = "사용자와 관계된 s3파일 리스트를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<S3ImagesRes> listPage(String email) {
        List<FileEntity> fileList =fileService.getFiles(email);
        if(fileList.size()!=0){
            return ResponseEntity.ok(S3ImagesRes.of(200, "Success", fileList));
        }
        //파일 리스트 가져오기가 실패했을 경우 요청 실패
        return ResponseEntity.ok(S3ImagesRes.of(404, "Failure", null));
    }
    @DeleteMapping("/delete")
    @ApiOperation(value = "파일 삭제", notes = "S3에 저장된 파일을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 404, message = "파일 경로 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> deleteImage(@RequestParam String filePath){
        if(s3Service.deleteFile(filePath)){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        //파일 삭제가 실패했을 경우 요청 실패
        return ResponseEntity.ok(BaseResponseBody.of(404, "Failure"));
    }
    @GetMapping("/youtubekey")
    @ApiOperation(value = "유튜브 가져오기", notes = "유튜브 스트리밍 키를 가져온다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 404, message = "키 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<YoutubeRes> getKey() {
        List<YoutubeKey> keyList =s3Service.getYKey();
        if(keyList.size()!=0){
            return ResponseEntity.ok(YoutubeRes.of(200, "Success", keyList));
        }
        //스트리밍 키가 존재하지 않는경우 요청 실패
        return ResponseEntity.ok(YoutubeRes.of(404, "Failure", null));
    }
}
