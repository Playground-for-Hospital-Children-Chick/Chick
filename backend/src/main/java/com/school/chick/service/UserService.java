package com.school.chick.service;

import com.school.chick.domain.dto.UserLoginInfo;
import com.school.chick.domain.dto.UserRegisterPostReq;
import com.school.chick.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

        public User getUserByEmail(String email);
        public boolean createUser(UserRegisterPostReq userRegisterInfo);

        public UserLoginInfo getUserLoginInfo(User user);

}
