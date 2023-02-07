package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoRes {
    // 이름
    String userName;
    // 나이
    int userAge;
    // 생일
    String userBirth;
    // 성별
    String userSex;
    // 이메일
    String userEmail;
    //(예정)게임플레이비중
    //(예정)누적출석일
}
