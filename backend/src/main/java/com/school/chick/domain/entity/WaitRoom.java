package com.school.chick.domain.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@ApiModel(value = "WaitRoom : 대기방 정보", description = "대기방의 상세 정보를 나타낸다.")
@Table(name = "WAIT_ROOM")
public class WaitRoom {
    @Id
    @GeneratedValue
    private Long waitNo;
    @ManyToOne
    @JoinColumn(name = "USER_NO")
    private User userNO;
    private String waitGameType;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime waitCreatDate;
}
