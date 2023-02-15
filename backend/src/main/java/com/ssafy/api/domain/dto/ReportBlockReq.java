package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel("ReportBlockRequest")
@Getter
public class ReportBlockReq {
    @ApiModelProperty(name="유저 email", example = "ssafy@ssafy.com")
    String userEmail;
}
