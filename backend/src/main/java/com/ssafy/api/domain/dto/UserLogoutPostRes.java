package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;



/**
 * 로그아웃 API ([POST] /api/user) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("UserLogoutPostRes")
public class UserLogoutPostRes {
    @ApiModelProperty(name="JWT refreshToken 인증 토큰", example = "null")
    String refreshToken;

}
