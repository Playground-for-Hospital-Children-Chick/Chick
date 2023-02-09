package com.ssafy.api.domain.entity;

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
@Setter
@ToString
@Builder
@AllArgsConstructor
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
    private String roomSession;
    private String roomStatus;
    private String roomGuest;

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


//    @OneToMany(mappedBy = "room")
//    private List<Matching> matchingList = new ArrayList<Matching>();
//
//    public void addMember(Matching matching) {
//        this.matchingList.add(matching);
//        // 무한루프에 빠지지 않도록 체크
//        if (matching.getRoom() != this) {
//            matching.setRoom(this);
//        }
//    }
}
