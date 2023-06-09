package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.RoomDisconnectReq;
import com.ssafy.api.domain.dto.RoomSessionReq;
import com.ssafy.api.service.RoomService;
import io.openvidu.java.client.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController()
public class SessionController {
    @Autowired
    private RoomService roomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param roomSessionReq The Roominfo
     * @return The Session ID
     */
    @PostMapping("/api/sessions")
    @ApiOperation(value="자동 매칭으로 게임방 입장", notes = "세션을 생셩하여 방을 매칭해준다")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) RoomSessionReq roomSessionReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String email = roomSessionReq.getEmail();
        String gameType = roomSessionReq.getGameType();
        String guest = roomSessionReq.getGuest();
        String userSession = roomService.getRoomSession(email, gameType,guest); // 회원에 참여할 세션을 새로 생성 혹은 기존 새션에서 가져온다
        if (userSession.equals("visited"))  { // 유저가 참여하고 있는 방이 있으면
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // 403 error
        }
        roomService.createMachingInfo(roomSessionReq, userSession); // 매칭에 대한 로그를 데이터베이스에 저장한다
        Map<String, Object> sessionParam = new HashMap<>();
        sessionParam.put("customSessionId", userSession); // 방 연결을 위해 세션 정보 저장
        SessionProperties properties = SessionProperties.fromJson(sessionParam).build(); // openvidu properties 설정
        Session session = openvidu.createSession(properties); // openvidu 방 연결
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK); // 방 연결 완료
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    @ApiOperation(value="선택으로 게임방 입장", notes = "기존에 새성한 게임방에 입장한다")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);//세션 아이디에 맞는 세션을 가져온다.
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/api/sessions/{sessionId}/disconnect")
    @ApiOperation(value="게임방 나가기", notes = "게임방에서 나간다")
    public ResponseEntity<String> disconnect(@RequestBody(required = true) RoomDisconnectReq roomDisconnectReq) {
        if (roomService.disconnect(roomDisconnectReq.getEmail(), roomDisconnectReq.getSessionId())) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
