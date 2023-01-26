package com.school.chick.service.Impl;

import com.school.chick.domain.entity.User;
import com.school.chick.domain.repository.UserRepository;
import com.school.chick.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

//    private void validateDuplicateMember(Member member) {
//        memberRepository.save(member);
//        memberRepository.findByChildName(member.getId()).ifPresent(member1 -> {
//            throw  new IllegalStateException("존재");
//        });
//    }
}
