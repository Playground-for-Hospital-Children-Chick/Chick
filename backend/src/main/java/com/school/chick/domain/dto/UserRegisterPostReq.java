package com.school.chick.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name="유저 현재 프로필", example = "1")
    long prof_no;
    @ApiModelProperty(name="유저 이메일", example = "ssafy@ssafy.com")
    String user_email;
    @ApiModelProperty(name="유저 비밀번호", example = "your_password")
    String user_password;
    @ApiModelProperty(name="유저 자식 이름", example = "한싸피")
    String user_child_name;
    @ApiModelProperty(name="유저 부모님 이름", example = "김싸피")
    String user_parent_name;
    @ApiModelProperty(name="유저 성별", example = "M or F")
    String user_sex;
    @ApiModelProperty(name="유저 출생일", example = "2016-01-01")
    String user_birth;
    @ApiModelProperty(name="유저 상태(0: 회원, 1: 차단)", example = "0")
    int user_state;
    @ApiModelProperty(name="유저 신고당한 횟수", example = "2")
    int user_reported;
    @ApiModelProperty(name="유저 서비스이용약관", example="Y")
    String user_service_term;
    @ApiModelProperty(name="유저 개인정보이용약관", example="Y")
    String user_privacy_term;
    @ApiModelProperty(name="유저 역할(관리자/회원)", example="N")
    String user_role;
    @ApiModelProperty(name="생성자", example="ssafy")
    String user_create_by;
    @ApiModelProperty(name="생성일", example="2023-01-27")
    LocalDateTime user_create_date;
    @ApiModelProperty(name="수정자", example="ssafy")
    String user_upadate_by;
    @ApiModelProperty(name="수정일", example="2023-01-27")
    LocalDateTime user_update_date;
}
