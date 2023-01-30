package com.school.chick.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("WaitRoomRequest")
public class WaitRoomReq {
    @ApiModelProperty(name = "회원 이메일", example = "ssafy3@ssafy.com")
    private String userEmail;

    @ApiModelProperty(name = "게임종류", example = "face")
    private String waitGameType;
}
