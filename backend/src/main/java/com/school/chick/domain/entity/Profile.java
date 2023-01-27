package com.school.chick.domain.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
@Table(name = "PROFILE")
public class Profile {

    @Id
    @ApiModelProperty(value = "프로필 번호")
    private int profNo;
    @ApiModelProperty(value = "원본 파일 이름")
    private String profImg;
    @ApiModelProperty(value = "저장된 파일 이름")
    private String profImgPath;
    @CreatedBy
    @Column(updatable = false)
    @ApiModelProperty(value = "생성자")
    private String profCreateBy;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    @ApiModelProperty(value = "생성일")
    private LocalDateTime profCreateDate;

    @ApiModelProperty(value = "수정자")
    @LastModifiedBy
    private String profUpdateBy;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    @ApiModelProperty(value = "수정일")
    private LocalDateTime  profUpdateDate;

}
