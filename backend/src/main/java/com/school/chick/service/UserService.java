package com.school.chick.service;

import com.school.chick.domain.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {

        public String join(UserDto user);
        public List<UserDto> findUsers();
        public Optional<UserDto> findOne(Long userEmail);


}
