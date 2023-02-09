package com.ssafy.api.controller;

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
        String guset = roomSessionReq.getGuest();
        System.out.println("세션 요청입니다다");
        System.out.println("세션 요청입니다");
        System.out.println("세션 요청입니다");
        System.out.println("params: " +roomSessionReq.toString());
        String userSession = roomService.getRoomSession(email, gameType,guset); // 회원에 참여할 세션을 새로 생성 혹은 기존 새션에서 가져온다
        roomService.createMachingInfo(roomSessionReq, userSession, guset); // 매칭에 대한 로그를 데이터베이스에 저장한다
        Map<String, Object> sessionParam = new HashMap<>(); // 유저 새션 정보를 저장할 변수
        sessionParam.put("customSessionId", userSession); // // 유저 새션 정보를 저장
        System.out.println("sessionParam: " + sessionParam.toString());
        SessionProperties properties = SessionProperties.fromJson(sessionParam).build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
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
        System.out.println("연결 요청입니다다");
        System.out.println("연결 요청입니다");
        System.out.println("연결 요청입니다");
        System.out.println("sessionId :" + sessionId);
        System.out.println("params: " + params.toString());
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        System.out.println("properties: " + properties.toString());
        Connection connection = session.createConnection(properties);
        System.out.println("connection "+connection.getConnectionId()+"  "+connection.getRtspUri()+"    "+connection.getToken());
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/api/sessions/{sessionId}/disconnect")
    @ApiOperation(value="게임방 나가기", notes = "게임방에서 나간다")
    public ResponseEntity<String> disconnect(@PathVariable("sessionId") String sessionId) {
        if (roomService.disconnect(sessionId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
