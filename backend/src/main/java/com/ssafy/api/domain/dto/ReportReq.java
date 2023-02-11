package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ApiModel("ReportReq")
@ToString
public class ReportReq {
    @ApiModelProperty(name="카테고리", example = "욕설, 부적절 영상,기타 ...")
    String category;
    @ApiModelProperty(name="신고 내용", example = "이 사람이 욕했어요")
    String content;
    @ApiModelProperty(name = "신고자", example = "chick@ssafy.com")
    String reporter;
    @ApiModelProperty(name = "신고 당한 사람", example = "ssafy@ssafy.com")
    String reportedPeople;
}
