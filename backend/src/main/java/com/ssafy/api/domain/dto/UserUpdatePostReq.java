package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePostRequest")
public class UserUpdatePostReq {
    @ApiModelProperty(name="유저 email", example = "ssafy@ssafy.com")
    String user_email;
    @ApiModelProperty(name="유저 자녀 이름", example = "ssafy")
    String user_child_name;
    @ApiModelProperty(name="유저 출생일", example = "20160101")
    String user_birth;
}
