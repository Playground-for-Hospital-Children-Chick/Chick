package com.school.chick.domain.repository;

import com.school.chick.domain.entity.WaitRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface WaitRoomRepository  extends JpaRepository<WaitRoom, Long> {

}
