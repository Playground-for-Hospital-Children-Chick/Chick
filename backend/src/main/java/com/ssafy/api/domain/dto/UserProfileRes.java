package com.ssafy.api.domain.dto;

import com.ssafy.api.domain.entity.FileEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


/**
 * 유저 프로필 관리 API ([GET] /api/user) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("UserProfileRes")
public class UserProfileRes extends BaseResponseBody{
    @ApiModelProperty(name="업로드된 파일리스트", example = "")
    String filePath;

    public static UserProfileRes of(Integer statusCode, String message, String filePath) {
        UserProfileRes res = new UserProfileRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setFilePath(filePath);
        return res;
    }
}
