package com.ssafy.api.service;

import com.ssafy.api.domain.dto.UserFindEmailReq;
import com.ssafy.api.domain.dto.UserLoginInfo;
import com.ssafy.api.domain.dto.UserRegisterPostReq;
import com.ssafy.api.domain.entity.User;

public interface UserService {

        public User getUserByEmail(String email);
        public boolean createUser(UserRegisterPostReq userRegisterInfo);

        public UserLoginInfo getUserLoginInfo(User user);

        public User findEmail(UserFindEmailReq userFindEmailReq);

}
