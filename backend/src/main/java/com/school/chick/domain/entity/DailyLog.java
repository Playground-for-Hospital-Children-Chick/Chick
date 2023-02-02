package com.school.chick.domain.entity;

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
@Builder
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@ApiModel(value = "DAYLOG : 데일리 로그", description = "마이페이지에서 보여줄 로그의 정보를 나타낸다.")
@Table(name = "DAILY_LOG")
public class DailyLog {
    @Id
    @GeneratedValue
    @ApiModelProperty(name = "LOG_ID", value = "로그 번호")
    private int id;

    private String logGameName;

    @CreatedBy
    @Column(updatable = false)
    private String logCreateBy;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime logCreateDate;

}
