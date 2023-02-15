package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

/**
 * 차단한 유저 리스트 API ([GET] /auth/report) 요청에 대한 응답값 정의
 */
@Setter
@Getter
@ToString
@ApiModel("ReportBlockResponse")
public class ReportBlockRes {
    @ApiModelProperty(name="응답 메시지", example = "정상")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "200")
    Integer statusCode = null;
    @ApiModelProperty(name="유저 로그인 정보", example = "이메일, 아이이름, 회원 역할")
    ArrayList<ReportBlock> reportBlocks;

    public static ArrayList<ReportBlock> of(Integer statusCode, String message, ArrayList<ReportBlock> reportBlocks) {
        ReportBlockRes reportBlockRes = new ReportBlockRes();
        reportBlockRes.setMessage(message);
        reportBlockRes.setStatusCode(statusCode);
        reportBlockRes.setReportBlocks(reportBlocks);
        return reportBlocks;
    }
}
