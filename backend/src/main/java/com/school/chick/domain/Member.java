package com.school.chick.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@ApiModel(value = "Member : 회원정보", description = "회원의 상세 정보를 나타낸다.")
public class Member {
    @Id
    @ApiModelProperty(value = "회원 아이디")
    private String id;
    @ApiModelProperty(value = "회원 비밀번호")
    private String password;
    @ApiModelProperty(value = "아이 이름")
    @Column(name = "child_name")
    private String childName;
    @ApiModelProperty(value = "회원 닉네임")
    private String nick;
    @ApiModelProperty(value = "회원 부모님 이름")
    @Column(name = "parent_name")
    private String parentName;
    @ApiModelProperty(value = "회원 이메일")
    private String email;

    @Builder
    public Member(String id, String password, String childName, String nick, String parentName, String email) {
        this.id = id;
        this.password = password;
        this.childName = childName;
        this.nick = nick;
        this.parentName = parentName;
        this.email = email;
    }
}
