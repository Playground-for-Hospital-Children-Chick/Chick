package com.school.chick.domain.repository;

import com.school.chick.domain.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public interface RoomRepository extends JpaRepository<Room, Integer> {
    ArrayList<Room> findByRoomTypeOrderByRoomCntDesc(String roomType);
}
