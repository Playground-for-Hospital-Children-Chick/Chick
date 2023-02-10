package com.ssafy.api.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {

    ROLE_ADMIN("관리자"), ROLE_USER("유저`"), ROLE_GUEST("게스트");

    private String description;

    UserRole(String description) {
        this.description = description;
    }
}
