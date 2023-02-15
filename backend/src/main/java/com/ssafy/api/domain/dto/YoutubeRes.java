package com.ssafy.api.domain.dto;

import com.ssafy.api.domain.entity.FileEntity;
import com.ssafy.api.domain.entity.YoutubeKey;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;



/**
 * 유튜브 스트림 키 관련 ([GET] /api/s3/youtubekey) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("YoutubeRes")
public class YoutubeRes extends BaseResponseBody{
    @ApiModelProperty(name="유튜브 스트리밍 키", example = "absd132456")
    List<YoutubeKey> streamingKey;
    public static YoutubeRes of(Integer statusCode, String message, List<YoutubeKey> YoutubeKey) {
        YoutubeRes res = new YoutubeRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setStreamingKey(YoutubeKey);
        return res;
    }
}
