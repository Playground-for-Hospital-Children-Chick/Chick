package com.school.chick.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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
