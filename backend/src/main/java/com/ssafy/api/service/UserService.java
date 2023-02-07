package com.ssafy.api.service;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.User;

public interface UserService {

        public User getUserByEmail(String email);
        public boolean createUser(UserRegisterPostReq userRegisterInfo);

        public UserLoginInfo getUserLoginInfo(User user);

        public User findEmail(UserFindEmailReq userFindEmailReq);

        public boolean deleteUser(UserLoginPostReq deleteInfo);

        public UserInfoRes getUserInfo(String email);
}
