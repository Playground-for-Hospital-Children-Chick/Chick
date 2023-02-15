package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 유저 차단 API ([GET] /api/report) 요청에 필요한 리퀘스트 바디 정의
 */

@Setter
@Getter
@ToString
public class ReportBlock {
    @ApiModelProperty(name="차단한 유저 이메일", example = "ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="차단한 유저 이름", example = "ssafy")
    String name;
    @ApiModelProperty(name="차단한 유저 이름", example = "2016-01-01")
    String reportDate;

}
