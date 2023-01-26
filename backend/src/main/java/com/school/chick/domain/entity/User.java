package com.school.chick.domain.entity;

import com.school.chick.config.UserRole;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

import java.time.LocalDateTime;

import static org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
@Table(name = "UerInfo")
public class User {
    @Id
    @GeneratedValue
    @ApiModelProperty(value = "회원별 할당 숫자")
    private int userNo;
    @ManyToOne
    @JoinColumn(name = "profile_no")
    @ApiModelProperty(value = "프로필 번호")
    private Profile profileNo;
    @ApiModelProperty(value = "회원 이메일")
    @Column(nullable = false, length=100, unique = true)
    private String userEmail;
    @ApiModelProperty(value = "회원 비밀번호")
    private String userPwd;
    @ApiModelProperty(value = "아이 이름")
    private String userChName;
    @ApiModelProperty(value = "보호자 이름")
    private String userParentName;
    @ApiModelProperty(value = "아이 성별")
    private String userSex;
    @ApiModelProperty(value = "아이 생일")
    private String userBirth;
    @ApiModelProperty(value = "회원 상태")
    private String userState;
    @ApiModelProperty(value = "신고 당한 횟수")
    private String userNumberOfReports;
    @ApiModelProperty(value = "회원 서비스 약관")
    private String userServiceTerm;
    @ApiModelProperty(value = "회원 약관")
    private String userPrivacyTerm;
    @ApiModelProperty(value = "현재 프로필")
    private String userCurProfile;
    @CreatedBy
    @Column(updatable = false)
    @ApiModelProperty(value = "생성자")
    private String userCreateBy;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    @ApiModelProperty(value = "생성일")
    private LocalDateTime userCreateDate;
    @ApiModelProperty(value = "수정자")
    @LastModifiedBy
    private String userUpdateBy;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    @ApiModelProperty(value = "수정일")
    private LocalDateTime userUpdateDate;
    @Column(name = "userRole")
    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.USER;

}
