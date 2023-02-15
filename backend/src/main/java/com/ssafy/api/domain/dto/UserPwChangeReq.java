package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/**
 *비밀번호 변경 API ([PUT] /api/user/pwd/change) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
@ToString
@ApiModel("UserPwChangeReq")
public class UserPwChangeReq {
    @ApiModelProperty(name="유저 email", example = "ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="기존 Password", example = "your_password")
    String password;
    @ApiModelProperty(name="변경한 Password", example = "aa123456789")
    String newPassword;
}
