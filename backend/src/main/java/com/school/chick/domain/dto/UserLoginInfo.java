package com.school.chick.domain.dto;

import com.school.chick.domain.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import javax.persistence.Column;

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
