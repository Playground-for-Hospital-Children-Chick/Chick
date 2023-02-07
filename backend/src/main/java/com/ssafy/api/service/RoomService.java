package com.ssafy.api.service;


import com.ssafy.api.domain.dto.RoomSessionReq;

import java.util.Map;

public interface RoomService {
    public String getRoomSession(String email, String gameType);
    public void createMachingInfo(RoomSessionReq roomSessionReq, String userSession);
    public boolean disconnect(String sessionId);
}
