package com.school.chick.domain.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 엑세스 토큰이 만료되어 재 발급하는 API ([POST] /auth/reaccess) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("ReAccessPostResponse")
public class ReAccessPostRes extends BaseResponseBody{
    @ApiModelProperty(name="JWT access 인증 토큰", example = "ekdif123SDKVIdf1231...")
    String accessToken;
    @ApiModelProperty(name="email", example = "ssafy@ssafy.com")
    String email;

    public static ReAccessPostRes of(Integer statusCode, String message, String accessToken, String email) {
        ReAccessPostRes res = new ReAccessPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setEmail(email);
        return res;
    }
}
