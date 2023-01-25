package com.school.chick.controller;

import com.school.chick.domain.dto.UserDto;
import com.school.chick.service.UserService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Api("회원 관리 퀀트롤러 API V1")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/create-user")
    public String create(UserDto user){
        System.out.println(user+" create-user ");
        userService.join(user);
        return "redirect:/";
    }
    @GetMapping("/find")
    public String list(Model model){
        List<UserDto> members = userService.findUsers();
        model.addAttribute("members", members);
        return "member/memberList";
    }



}
