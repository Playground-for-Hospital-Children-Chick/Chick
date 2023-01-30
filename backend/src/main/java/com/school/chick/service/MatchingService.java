package com.school.chick.service;

import com.school.chick.domain.dto.WaitRoomReq;

public interface MatchingService {
    public boolean createWaiting(WaitRoomReq waitRoomReq);
}
