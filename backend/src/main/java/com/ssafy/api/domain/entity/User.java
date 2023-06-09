package com.ssafy.api.domain.entity;

import com.ssafy.api.domain.dto.UserRole;
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
@Setter
@ToString
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
@Table(name = "USER_INFO")
public class User {
    @Id
    @GeneratedValue
    @ApiModelProperty(name = "USER_ID", value = "매칭 번호")
    private int id;

    @ManyToOne
    @JoinColumn(name = "PROF_ID")
    private Profile profile;

    private String userPwd;
    private String userChName;
    private String userParentName;
    private String userEmail;
    private String userSex;
    private String userBirth;
    @ApiModelProperty(name = "USER_STATE", value = "유저상태(0: 정상, 1:탈퇴, 2:정지")
    private String userState;
    private int userNumberOfReports;
    private String userServiceTerm;
    private String userPrivacyTerm;
    private UserRole userRole;

    @CreatedBy
    @Column(updatable = false)
    @ApiModelProperty(value = "생성자")
    private String userCreateBy;
    @CreatedDate
    @Column(updatable = false)
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

    @Builder
    public User(int id, String userPwd, String userChName, String userParentName, String userEmail, String userSex, String userBirth, String userState, int userNumberOfReports, String userServiceTerm, String userPrivacyTerm, UserRole userRole, String userCreateBy, LocalDateTime userCreateDate, String userUpdateBy, LocalDateTime userUpdateDate) {
        this.id = id;
        this.userPwd = userPwd;
        this.userChName = userChName;
        this.userParentName = userParentName;
        this.userEmail = userEmail;
        this.userSex = userSex;
        this.userBirth = userBirth;
        this.userState = userState;
        this.userNumberOfReports = userNumberOfReports;
        this.userServiceTerm = userServiceTerm;
        this.userPrivacyTerm = userPrivacyTerm;
        this.userRole = userRole;
        this.userCreateBy = userCreateBy;
        this.userCreateDate = userCreateDate;
        this.userUpdateBy = userUpdateBy;
        this.userUpdateDate = userUpdateDate;
    }

}
