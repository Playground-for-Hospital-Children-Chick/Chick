package com.ssafy.api.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String email;

    @Column
    private String s3Url;

    public FileEntity(String title, String s3Url, String email) {
        this.title = title;
        this.s3Url = s3Url;
        this.email = email;
    }

    @Override
    public String toString() {
        return "FileEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", s3Url='" + s3Url + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}