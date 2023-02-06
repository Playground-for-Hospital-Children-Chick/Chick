package com.ssafy.api.service;


import java.util.Map;

public interface RoomService {
    public String getRoomSession(String email, String gameType);
    public void createMachingInfo(Map<String, Object> params, String userSession);
    public boolean disconnect(String sessionId);
}
