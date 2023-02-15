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
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@ApiModel(value = "Suggestion : 건의사항 게시판", description = "건의사항 게시판 입니다")
@Table(name = "Suggestion")
public class Suggestion {
    @Id
    @GeneratedValue
    @ApiModelProperty(name = "SUG_ID", value = "건의 번호")
    private int id;

    private String sugEmail;
    private String sugName;
    private String sugTitie;
    private String sugContent;

    @CreatedBy
    @Column(updatable = false)
    private String sugCreateBy;
    @CreatedDate
    @Column(updatable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime sugCreateDate;
    @LastModifiedBy
    private String sugUpdateBy;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime sugUpdateDate;

    @Builder
    public Suggestion(int id, String sugEmail, String sugName, String sugTitie, String sugContent, String sugCreateBy, LocalDateTime sugCreateDate, String sugUpdateBy, LocalDateTime sugUpdateDate) {
        this.id = id;
        this.sugEmail = sugEmail;
        this.sugName = sugName;
        this.sugTitie = sugTitie;
        this.sugContent = sugContent;
        this.sugCreateBy = sugCreateBy;
        this.sugCreateDate = sugCreateDate;
        this.sugUpdateBy = sugUpdateBy;
        this.sugUpdateDate = sugUpdateDate;
    }
}
