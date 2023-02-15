package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;


/**
 * 차단해제 API ([DELETE] /api/user/unblock) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@ApiModel("UnblockReq")
@ToString
public class UnblockReq {
    @ApiModelProperty(name = "신고자", example = "c@abc.com")
    String reporter;
    @ApiModelProperty(name = "신고 당한 사람", example = "cc@abc.com")
    String reportedPeople;
}
