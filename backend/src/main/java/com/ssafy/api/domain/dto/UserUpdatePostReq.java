package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원정보 변경 API ([PUT] /api/auth/login) 요청에 필요한 리퀘스트 바디 정의
 */
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
