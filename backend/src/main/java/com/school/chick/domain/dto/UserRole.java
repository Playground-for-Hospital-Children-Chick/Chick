package com.school.chick.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {

    ROLE_ADMIN("관리자"), ROLE_USER("유저`");

    private String description;

    UserRole(String description) {
        this.description = description;
    }
}
