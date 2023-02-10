package com.ssafy.api.domain.dto;

import com.ssafy.api.domain.entity.FileEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("S3ImagesRes")
public class S3ImagesRes extends BaseResponseBody{
    @ApiModelProperty(name="JWT access 인증 토큰", example = "ekdif123SDKVIdf1231...")
    List<FileEntity> filelist;

    public static S3ImagesRes of(Integer statusCode, String message, List<FileEntity> filelist) {
        S3ImagesRes res = new S3ImagesRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setFilelist(filelist);
        return res;
    }
}
