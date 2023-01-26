package com.school.chick.domain.dto;

import com.school.chick.config.UserRole;
import com.school.chick.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String userEmail;
    private String userPwd;
    private String userChName;
    private String userParentName;

    private UserRole userRole;

    /* DTO -> Entity */
    public User toEntity() {
        User user = User.builder()
                .userEmail(userEmail)
                .userPwd(userPwd)
                .userChName(userChName)
                .userParentName(userParentName)
                .userRole(userRole.USER)
                .build();
        return user;
    }
}
