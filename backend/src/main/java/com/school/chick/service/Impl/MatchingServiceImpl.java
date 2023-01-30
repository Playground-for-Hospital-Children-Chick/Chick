package com.school.chick.service.Impl;

import com.school.chick.domain.dto.WaitRoomReq;
import com.school.chick.domain.entity.WaitRoom;
import com.school.chick.domain.repository.WaitRoomRepository;
import com.school.chick.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MatchingServiceImpl implements MatchingService {
    private final WaitRoomRepository waitRoomRepository;

    @Autowired
    public MatchingServiceImpl(WaitRoomRepository waitRoomRepository) {
        this.waitRoomRepository = waitRoomRepository;
    }

    public boolean createWaiting(WaitRoomReq waitRoomReq) {
        WaitRoom waitUser= new WaitRoom();
        waitUser.setUserEmail(waitRoomReq.getUserEmail());
        waitUser.setWaitGameType(waitRoomReq.getWaitGameType());
        waitUser.setWaitCreatDate(LocalDateTime.now());
        waitRoomRepository.save(waitUser);
        return true;
    }

}
