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
@ApiModel(value = "WaitRoom : 대기방 정보", description = "대기방의 상세 정보를 나타낸다.")
@Table(name = "ROOM_INFO")
public class RoomInfo {
    @Id
    @GeneratedValue
    private Long roomId;
//    @ManyToOne
    @JoinColumn(name = "USER_Email")
    private String userEmail;
    private int roomCnt;
    private String roomType;
    private String roomLink;
    @CreatedBy
    @Column(updatable = false)
    private String roomCreateBy;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime roomCreateDate;
    @LastModifiedBy
    private String roomUpdateBy;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime roomUpdateDate;
}
