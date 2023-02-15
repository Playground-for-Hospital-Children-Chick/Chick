package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


/**
 * 이메일 찾기 API ([POST] /api/user/find/email) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
@ApiModel("UserFindEmailReq")
public class UserFindEmailReq {
    @ApiModelProperty(name="보호자 이름", example = "ssafy")
    String userParentName;
    @ApiModelProperty(name="아이 이름", example = "ssafy")
    String userChName;
    @ApiModelProperty(name="아이 생일", example = "20160101")
    String userBirth;
}
