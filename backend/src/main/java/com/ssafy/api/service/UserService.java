package com.ssafy.api.service;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.User;

public interface UserService {

        public User getUserByEmail(String email);
        public boolean createUser(UserRegisterPostReq userRegisterInfo);

        public UserLoginInfo getUserLoginInfo(User user);

        public String findEmail(String  userParentName, String userChName,String  userBirth);

        public boolean deleteUser(UserLoginPostReq deleteInfo);

        public String sendPwdMessage(String to)throws Exception;
        public UserLoginInfo createGuest();

        public void profileUpdate(String email,  String fileName) throws Exception;
        public String getProfile(String email);
        public UserLoginInfo updateUser(UserUpdatePostReq userUpdatePostReq);
        public void changePassword(UserLoginPostReq userChangePostReq);
}
