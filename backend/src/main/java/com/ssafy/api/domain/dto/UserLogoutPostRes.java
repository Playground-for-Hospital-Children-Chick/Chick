package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLogoutPostRes")
public class UserLogoutPostRes {
    @ApiModelProperty(name="JWT refreshToken 인증 토큰", example = "null")
    String refreshToken;

}
