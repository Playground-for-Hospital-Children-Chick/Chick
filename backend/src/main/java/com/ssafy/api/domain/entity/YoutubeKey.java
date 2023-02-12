package com.ssafy.api.domain.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@ApiModel(value = "YoutubeKey : 유튜브 키", description = "유튜브 스트리밍키를 나타낸다.")
@Table(name = "YOUTUBE_KEY")
public class YoutubeKey {
    @Id
    @GeneratedValue
    @ApiModelProperty(name = "YOUTUBEKEY_ID", value = "키번호")
    private int id;

    private String streamingKey;
}
