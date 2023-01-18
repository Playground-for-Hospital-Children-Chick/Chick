package com.school.chick.controller;

import com.school.chick.domain.dto.MemberDto;
import com.school.chick.service.JwtService;
import com.school.chick.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@Api("회원 관리 퀀트롤러 API V1")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private final MemberService memberService;
    @Autowired
    private JwtService jwtService;

    @Autowired
    public MemberController(MemberService memberService, JwtService jwtService) {
        this.memberService = memberService;
        this.jwtService = jwtService;
    }
    @PostMapping("/regist")
    public String create(MemberDto member){
        System.out.println(member+" member ");
        memberService.join(member);
        return "redirect:/";
    }
    @GetMapping("/find")
    public String list(Model model){
        List<MemberDto> members = memberService.findMemberes();
        model.addAttribute("members", members);
        return "members/memberList";
    }
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> login(
//            @RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) Member member) {
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = null;
//        try {
//            Member loginUser = memberService.login(member);
//            if (loginUser != null) {
//                String accessToken = jwtService.createAccessToken("userid", loginUser.getMemId());// key, data
//                String refreshToken = jwtService.createRefreshToken("userid", loginUser.getMemId());// key, data
////                memberService.saveRefreshToken(member.getMemId(), refreshToken);
//                logger.debug("로그인 accessToken 정보 : {}", accessToken);
//                logger.debug("로그인 refreshToken 정보 : {}", refreshToken);
//                resultMap.put("access-token", accessToken);
//                resultMap.put("refresh-token", refreshToken);
//                resultMap.put("message", SUCCESS);
//                status = HttpStatus.ACCEPTED;
//            } else {
//                resultMap.put("message", FAIL);
//                status = HttpStatus.ACCEPTED;
//            }
//        } catch (Exception e) {
//            logger.error("로그인 실패 : {}", e);
//            resultMap.put("message", e.getMessage());
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//        return new ResponseEntity<Map<String, Object>>(resultMap, status);
//    }


}
