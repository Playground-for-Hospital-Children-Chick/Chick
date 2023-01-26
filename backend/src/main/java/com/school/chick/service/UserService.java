package com.school.chick.service;

import com.school.chick.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

        public String join(User user);
        public List<User> findUsers();
        public User getUserByEmail(String email);


}
