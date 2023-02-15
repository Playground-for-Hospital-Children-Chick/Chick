package com.ssafy.api.domain.dto;

import com.ssafy.api.domain.entity.FileEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


/**
 * s3 이미지 리스트 API ([GET] /api/s3/list) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("S3ImagesRes")
public class S3ImagesRes extends BaseResponseBody{
    @ApiModelProperty(name="업로드된 파일리스트", example = " {" +
            "            \"id\": 1,\n" +
            "            \"title\": \"jaeuk\",\n" +
            "            \"email\": \"hju9707@naver.com\",\n" +
            "            \"s3Url\": \"https://ssafy-chick.s3.ap-northeast-2.amazonaws.com/hju9707%40naver.com/2023-02-11%2005%3A15%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.png\"\n" +
            "        }")
    List<FileEntity> filelist;

    public static S3ImagesRes of(Integer statusCode, String message, List<FileEntity> filelist) {
        S3ImagesRes res = new S3ImagesRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setFilelist(filelist);
        return res;
    }
}
