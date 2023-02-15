package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

/**
 * 유저 방 매칭 API ([POST] /api/sessions) 요청에 필요한 리퀘스트 바디 정의
 */

@Getter
@ApiModel("RoomSessionReq")
@ToString
public class RoomSessionReq {
    @ApiModelProperty(name="유저 email", example = "ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="게임종류", example = "face")
    String gameType;
    @ApiModelProperty(name = "게스트인지", example = "true")
    String guest;
}
