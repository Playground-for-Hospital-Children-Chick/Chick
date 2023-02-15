package com.ssafy.api.domain.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
@Table(name = "PROFILE")
public class Profile {
    @Id
    @GeneratedValue
    @ApiModelProperty(name = "PROF_ID", value = "매칭 번호")
    private int id;

    private String profName;
    private String profContent;
    private String profPath;
    private int profRequire;

    @CreatedDate
    @Column(updatable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    @ApiModelProperty(value = "생성일")
    private LocalDateTime profCreateDate;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    @ApiModelProperty(value = "수정일")
    private LocalDateTime  profUpdateDate;
    @Builder
    public Profile(int id, String profName, String profContent, String profPath, int profRequire, LocalDateTime profCreateDate, LocalDateTime profUpdateDate) {
        this.id = id;
        this.profName = profName;
        this.profContent = profContent;
        this.profPath = profPath;
        this.profRequire = profRequire;
        this.profCreateDate = profCreateDate;
        this.profUpdateDate = profUpdateDate;
    }
}
