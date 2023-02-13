package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ReportBlock {
    @ApiModelProperty(name="차단한 유저 이메일", example = "ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="차단한 유저 이름", example = "ssafy")
    String name;

}
