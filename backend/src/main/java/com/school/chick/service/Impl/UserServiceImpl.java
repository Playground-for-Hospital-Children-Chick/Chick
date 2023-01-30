package com.school.chick.service.Impl;

import com.school.chick.domain.dto.UserRegisterPostReq;
import com.school.chick.domain.entity.User;
import com.school.chick.domain.repository.UserRepository;
import com.school.chick.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByUserEmail(email);
        return user;
    }

//    public boolean createUser(UserRegisterPostReq userRegisterInfo) {
////        if (userRepository.findByPhone(userRegisterInfo.getPhone()) != null) {
////            return false;
////        }
//
//        User user = new User();
//        user.setPhone(userRegisterInfo.getPhone());
//        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
//        user.setName(userRegisterInfo.getName());
//        user.setAddress(userRegisterInfo.getAddress());
//        user.setBank(userRegisterInfo.getBank());
//        user.setAccount(userRegisterInfo.getAccount());
//        user.setZipCode(userRegisterInfo.getZipCode());
//        user.setDetailAddress(userRegisterInfo.getDetailAddress());
//        user.setPicture(imageRepository.findById(userRegisterInfo.getPicture()).get());
//        user.setData_create(LocalDateTime.now());
//        userRepository.save(user);
//        return true;
//    }
}
