package com.ssafy.api.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.ssafy.api.domain.entity.YoutubeKey;
import com.ssafy.api.domain.repository.YoutubeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final YoutubeRepository youtubeRepository;

    private final AmazonS3 amazonS3;

    public String uploadFile(@RequestPart MultipartFile multipartFile, String dirName) throws IOException {
        String fileName = multipartFile.getOriginalFilename();

        //파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        String contentType = "";
        String uploadFileName = "";

        //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "jpg":
                contentType = "image/jpg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "txt":
                contentType = "text/plain";
                break;
            case "csv":
                contentType = "text/csv";
                break;
        }

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            String formDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("/yyyy-MM-dd HH:mm"));
            uploadFileName = dirName+formDate+fileName;
            amazonS3.putObject(new PutObjectRequest(bucket, uploadFileName, multipartFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        //object 정보 가져오기
        ListObjectsV2Result listObjectsV2Result = amazonS3.listObjectsV2(bucket);
        List<S3ObjectSummary> objectSummaries = listObjectsV2Result.getObjectSummaries();

        return amazonS3.getUrl(bucket, uploadFileName).toString();
    }
    public boolean deleteFile(String filePath){
        try {
            // S3에서 삭제
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, filePath));
            return true;
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
        return false;
    }
    public List<YoutubeKey> getYKey(){
        return youtubeRepository.findAll();
    }
}