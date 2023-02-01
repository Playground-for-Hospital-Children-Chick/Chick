package com.school.chick.domain.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody{
    @ApiModelProperty(name="JWT access 인증 토큰", example = "ekdif123SDKVIdf1231...")
    String accessToken;
    @ApiModelProperty(name="유저 로그인 정보", example = "이메일, 아이이름, 회원 역할")
    UserLoginInfo userLoginInfo;

    public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, UserLoginInfo userLoginInfo) {
        UserLoginPostRes res = new UserLoginPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setUserLoginInfo(userLoginInfo);

        return res;
    }
}
