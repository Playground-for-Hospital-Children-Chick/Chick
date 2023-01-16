package com.school.chick.controller;

import com.school.chick.domain.Member;
import com.school.chick.service.MemberService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/member")
@Api("회원 관리 퀀트롤러 API V1")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    @PostMapping("/regist")
    public String create(Member member){
        System.out.println(member+" member ");
        memberService.join(member);
        return "redirect:/";
    }
    @GetMapping("/find")
    public String list(Model model){
        List<Member> members = memberService.findMemberes();
        model.addAttribute("members", members);
        return "members/memberList";
    }

}
