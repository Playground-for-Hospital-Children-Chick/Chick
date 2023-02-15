package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원정보 수정 API ([POST] /api/user/updateUserInfo) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserUpdatePostRes extends BaseResponseBody {
    @ApiModelProperty(name="유저 로그인 정보", example = "이메일, 아이이름, 회원 역할")
    UserLoginInfo userLoginInfo;

    public static UserUpdatePostRes of(Integer statusCode, String message, UserLoginInfo userLoginInfo) {
        UserUpdatePostRes res = new UserUpdatePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserLoginInfo(userLoginInfo);

        return res;
    }
}
