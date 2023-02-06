package com.ssafy.api.service.Impl;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.domain.entity.User;
import com.ssafy.api.domain.repository.UserRepository;
import com.ssafy.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByUserEmail(email);
        return user;
    }

    public boolean createUser(UserRegisterPostReq userRegisterInfo) {
        String pattern = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
        if ((userRepository.findByUserEmail(userRegisterInfo.getUser_email()) != null)
        ||(!userRegisterInfo.getUser_email().matches(pattern))) {
            return false;
        }

        userRepository.save(User.builder()
                .userEmail(userRegisterInfo.getUser_email().toString())
                .userPwd(passwordEncoder.encode(userRegisterInfo.getUser_password()).toString())
                .userChName(userRegisterInfo.getUser_child_name().toString())
                .userParentName(userRegisterInfo.getUser_parent_name().toString())
                .userSex(userRegisterInfo.getUser_sex().toString())
                .userBirth(userRegisterInfo.getUser_birth().toString())
                .userState("0")
                .userNumberOfReports(0)
                .userServiceTerm("Y")
                .userPrivacyTerm("Y")
                .userRole(UserRole.ROLE_USER)
                .userCreateBy(userRegisterInfo.getUser_email())
                .userCreateDate(LocalDateTime.now())
                .userUpdateBy(userRegisterInfo.getUser_email())
                .userUpdateDate(LocalDateTime.now())
                .build());

        return true;
    }

    @Override
    public UserLoginInfo getUserLoginInfo(User user) {
        UserLoginInfo userLoginInfo = new UserLoginInfo();
        userLoginInfo.setUserEmail(user.getUserEmail());
        userLoginInfo.setUserChName(user.getUserChName());
        userLoginInfo.setUserRole(user.getUserRole());
        return userLoginInfo;
    }

    @Override
    public User findEmail(UserFindEmailReq userFindEmailReq) {
        User user = userRepository.findByUserParentNameAndUserChNameAndUserBirth(userFindEmailReq.getUserParentName(),
                userFindEmailReq.getUserChName(), userFindEmailReq.getUserBirth());
        return user;
    }

    @Override
    public boolean deleteUser(UserLoginPostReq deleteInfo) {
        if (passwordEncoder.matches(deleteInfo.getPassword(), userRepository.findByUserEmail(deleteInfo.getEmail()).getUserPwd())) {
            userRepository.deleteByEmail(deleteInfo.getEmail());
            return true;
        }
        return false;
    }
}
