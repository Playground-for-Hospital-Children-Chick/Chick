package com.school.chick.domain.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CollectionId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@ApiModel(value = "RoomInfo : 게임방 정보", description = "게임방의 정보를 나타낸다")
@Table(name = "ROOM")
public class Room {
    @Id
    @GeneratedValue
    @Column(name ="ROOM_ID", columnDefinition = "INT UNSIGNED")
    private int id;

    private int roomCnt;
    private String roomType;
    private String roomLink;
    private String roomStatus;

    @CreatedBy
    @Column(updatable = false)
    private String roomCreateBy;
    @CreatedDate
    @Column(updatable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime roomCreateDate;
    @LastModifiedBy
    private String roomUpdateBy;
    @LastModifiedDate
    @Column(nullable = false)
    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime roomUpdateDate;

    @Builder
    public Room(int id, int roomCnt, String roomType, String roomLink, String roomStatus, String roomCreateBy, LocalDateTime roomCreateDate, String roomUpdateBy, LocalDateTime roomUpdateDate) {
        this.id = id;
        this.roomCnt = roomCnt;
        this.roomType = roomType;
        this.roomLink = roomLink;
        this.roomStatus = roomStatus;
        this.roomCreateBy = roomCreateBy;
        this.roomCreateDate = roomCreateDate;
        this.roomUpdateBy = roomUpdateBy;
        this.roomUpdateDate = roomUpdateDate;
    }

    @OneToMany(mappedBy = "ROOM")
    private List<Matching> matchingList = new ArrayList<Matching>();
}
