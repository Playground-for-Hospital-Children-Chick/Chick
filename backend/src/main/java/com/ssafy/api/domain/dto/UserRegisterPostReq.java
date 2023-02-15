package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;


/**
 * 유저 회원정보 수정 API ([POST] /api/user/updateUserInfo) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
@ToString
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name="유저 이메일", example = "ssafy@ssafy.com")
    String userEmail;
    @ApiModelProperty(name="유저 비밀번호", example = "your_password")
    String userPassword;
    @ApiModelProperty(name="유저 자녀 이름", example = "ssafy")
    String userChildName;
    @ApiModelProperty(name="유저 부모님 이름", example = "ssafy")
    String userParentName;
    @ApiModelProperty(name="유저 성별: 남자(M), 여자(W)", example = "M")
    String userSex;
    @ApiModelProperty(name="유저 출생일", example = "20160101")
    String userBirth;

}
