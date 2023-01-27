package com.school.chick.controller;

import com.school.chick.domain.dto.BaseResponseBody;
import com.school.chick.domain.entity.User;
import com.school.chick.service.UserService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
//    @PostMapping()
//    @ApiOperation(value="회원 가입", notes = "아이디와 패스워드를 통해 회원가입 한다")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "가입 실패"),
//            @ApiResponse(code = 404, message = "반환값 없음"),
//            @ApiResponse(code = 500, message = "서버 오류"),
//    })
//    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody @ApiParam(value="회원가입 정보", required = true)UserRegisterPostReq registerInfo) {
//        if(userService.createUser(registerInfo)) {
//            // 가입 성공시 성공 리턴
//            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//        }
//        // 가입 실패시 실패 리턴
//        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
//    }
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }



}
