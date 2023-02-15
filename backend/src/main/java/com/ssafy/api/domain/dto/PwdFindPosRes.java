package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


/**
 * 비밀번호 찾기 API ([GET] /api/user) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class PwdFindPosRes extends BaseResponseBody{
    @ApiModelProperty(name="응답 메시지", example = "정상")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "200")
    Integer statusCode = null;
    @ApiModelProperty(name="이메일", example = "ssafy@ssafy.com")
    String email = null;

    public static PwdFindPosRes of(Integer statusCode, String message, String email) {
        PwdFindPosRes res = new PwdFindPosRes();
        res.setMessage(message);
        res.setStatusCode(statusCode);
        res.setEmail(email);
        return res;
    }
}
