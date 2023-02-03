package com.ssafy.api.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@ApiModel("UserLoginINfo")
public class UserLoginInfo {
    @ApiModelProperty(value = "회원 이메일")
    private String userEmail;
    @ApiModelProperty(value = "아이 이름")
    private String userChName;
    @ApiModelProperty(value = "회원 역할")
    private UserRole userRole;

}
