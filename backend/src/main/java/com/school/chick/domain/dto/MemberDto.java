package com.school.chick.domain.dto;

import com.school.chick.config.UserRole;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

import java.time.LocalDateTime;

import static org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.*;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@ApiModel(value = "Member : 회원정보", description = "회원의 상세 정보를 나타낸다.")
@Table(name = "UerInfo")
public class MemberDto {
    @Id
    @GeneratedValue
    @ApiModelProperty(value = "회원별 할당 숫자")
    private int memNO;

    @ApiModelProperty(value = "회원 아이디")
    private String memId;
    @ApiModelProperty(value = "회원 비밀번호")
    private String memPwd;
    @ApiModelProperty(value = "아이 이름")
    private String memChName;
    @ApiModelProperty(value = "아이 생일")
    private String memBirth;
    @ApiModelProperty(value = "아이 성별")
    private String memSex;
    @ApiModelProperty(value = "회원 이메일")
    private String memEmail;
    @ApiModelProperty(value = "회원 서비스 약관")
    private String memServiceTerm;
    @ApiModelProperty(value = "회원 약관")
    private String memPrivacyTerm;
    @ApiModelProperty(value = "현재 프로필")
    private String memCurProfile;
    @ApiModelProperty(value = "현재 회원 상태")
    private int memState;
    @ApiModelProperty(value = "신고 당한 횟수")
    private int memNumberOfReports;
    @CreatedBy
    @Column(updatable = false)
    @ApiModelProperty(value = "생성자")
    private String memCreateBy;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    @ApiModelProperty(value = "생성일")
    private LocalDateTime memCreateDate;
    @ApiModelProperty(value = "수정자")
    @LastModifiedBy
    private String memUpdateBy;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    @ApiModelProperty(value = "수정일")
    private LocalDateTime memUpdateDate;
    @Column(name = "memRole")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_NOT_PERMITTED;

}
