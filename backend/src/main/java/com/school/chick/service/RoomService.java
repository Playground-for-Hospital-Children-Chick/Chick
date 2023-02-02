package com.school.chick.service;


import java.util.Map;

public interface RoomService {
    public String getRoomSession(String gameType);
    public void createMachingInfo(Map<String, Object> params, String userSession);
}
