package com.school.chick.domain.entity;

import io.micrometer.core.lang.NonNullApi;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@ApiModel(value = "Mathcing : 매칭 정보", description = "회원의 매칭 정보를 나타낸다")
@Table(name = "Matching")
public class Matching {
    @Id
    @GeneratedValue
    @ApiModelProperty(value = "매칭 번호")
    private long matNo;
    @ApiModelProperty(value = "회원 이메일")
    private String userEmail;
    @ApiModelProperty(value = "방번호")
    private long roomId;
    @ApiModelProperty(value = "게임종류")
    private String matGameType;
    @ApiModelProperty(value = "생성일")
    LocalDateTime matCreateDate;
}
